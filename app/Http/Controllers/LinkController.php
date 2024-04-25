<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
// Model
use App\Models\LinkType;

class LinkController extends Controller
{
    /**
     * Display the specified resource.
     */
    public function show(Request $reques)
    {
        $links = LinkType::all();
        $links->load('schemas');;
        return $links;
    }
}
