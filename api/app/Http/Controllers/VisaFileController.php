<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\VisaFile;
use Illuminate\Support\Facades\Storage;

class VisaFileController extends Controller
{
    public function upload(Request $request)
    {
        $validated = $request->validate([
            'file' => 'required|file|mimes:pdf,jpg,png|max:4096',
        ]);

        $file = $request->file('file');
        $path = $file->store('visa_files');

        $visaFile = VisaFile::create([
            'filename' => $path,
            'original_name' => $file->getClientOriginalName(),
            'type' => $file->getClientMimeType(),
            'size' => $file->getSize(),
        ]);

        return response()->json($visaFile, 201);
    }

    public function index()
    {
        $files = VisaFile::all()->groupBy('type');

        return response()->json($files);
    }

    public function destroy($id)
    {
        $file = VisaFile::findOrFail($id);
        Storage::delete($file->filename);
        $file->delete();

        return response()->json(['message' => 'File deleted successfully'], 200);
    }
}