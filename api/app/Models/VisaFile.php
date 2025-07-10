<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VisaFile extends Model
{
    protected $fillable = ['filename', 'original_name', 'type', 'size'];
}
