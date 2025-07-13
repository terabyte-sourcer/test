<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\VisaFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

class VisaFileController extends Controller
{
    public function upload(Request $request)
    {
        $validated = $request->validate([
            'file' => 'required|file|mimes:pdf,jpg,png|max:4096',
        ]);

        $file = $request->file('file');
        $path = $file->store('visa_files', 'public');

        $visaFile = VisaFile::create([
            'filename' => $path,
            'original_name' => $file->getClientOriginalName(),
            'type' => $file->getClientMimeType(),
            'size' => $file->getSize(),
            'category' => $request->input('category', 'forms'),
        ]);

        if ($file->getClientMimeType() === 'application/pdf') {
            \Log::info('Starting PDF thumbnail generation with Poppler for file: ' . $path);
            try {
                $thumbnailDir = storage_path('app/public/visa_files/thumbnails');
                if (!File::exists($thumbnailDir)) {
                    File::makeDirectory($thumbnailDir, 0755, true);
                }

                $pdfPath = storage_path('app/public/' . $path);
                $thumbnailPath = 'visa_files/thumbnails/' . pathinfo($file->hashName(), PATHINFO_FILENAME) . '.jpg';
                $thumbnailFullPath = storage_path('app/public/' . $thumbnailPath);

                $cmd = sprintf(
                    'pdftoppm -jpeg -f 1 -singlefile -scale-to 512 "%s" "%s"',
                    addslashes($pdfPath),
                    addslashes(substr($thumbnailFullPath, 0, -4)) 
                );
                \Log::info('Running command: ' . $cmd);
                exec($cmd, $output, $returnVar);

                if ($returnVar === 0 && file_exists($thumbnailFullPath)) {
                    $visaFile->thumbnail = $thumbnailPath;
                    $visaFile->save();
                    \Log::info('Poppler thumbnail generation successful for: ' . $thumbnailPath);
                } else {
                    \Log::error('Poppler thumbnail generation failed. Return code: ' . $returnVar);
                }
            } catch (\Exception $e) {
                \Log::error('Poppler PDF thumbnail generation exception: ' . $e->getMessage());
            }
        }

        return response()->json($visaFile, 201);
    }

    public function index()
    {
        $files = VisaFile::all();

        $grouped = [
            'passport' => [],
            'photos' => [],
            'forms' => [],
        ];

        foreach ($files as $file) {
            $file->preview = null;
            if (strpos($file->type, 'pdf') !== false) {
                if ($file->type === 'application/pdf' && $file->thumbnail) {
                    $file->preview = asset('storage/' . $file->thumbnail);
                } else {
                    $file->preview = asset('storage/' . $file->filename);
                }
            } else if (strpos($file->type, 'image') !== false) {
                $file->preview = asset('storage/' . $file->filename);
            }

            $cat = $file->category ?? 'forms';
            if (isset($grouped[$cat])) {
                $grouped[$cat][] = $file;
            } else {
                $grouped['forms'][] = $file;
            }
        }

        return response()->json($grouped);
    }

    public function destroy($id)
    {
        $file = VisaFile::findOrFail($id);
        
        Storage::disk('public')->delete($file->filename);
        
        if ($file->thumbnail) {
            Storage::disk('public')->delete($file->thumbnail);
        }
        
        $file->delete();

        return response()->json(['message' => 'File deleted successfully'], 200);
    }
}
