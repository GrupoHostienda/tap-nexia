<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
// Validation
use App\Http\Helpers\Validations\LinkValidation;
// Model
use App\Models\LinkType;
use App\Models\Link;

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
    /**
     * Update the specified resource.
     */
    public function update(Request $request,Link $link)
    {
        // validate data and throw erros
        $validation = new LinkValidation($request);
        $data = $validation->update();
    }
}
