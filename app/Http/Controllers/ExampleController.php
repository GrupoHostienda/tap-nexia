<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Example;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class ExampleController extends Controller
{
     /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Dashboard', [
            'products' => Example::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Example::create($request->all());

        return Redirect::back()->with([
            'message' => 'Example created successfully',
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Example $example)
    {

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $example = Example::find($request->id);
        $example->update($request->all());

        return Redirect::back()->with([
            'message' => 'Example updated successfully',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, $id)
    {
        Example::destroy($id);

        return Redirect::back()->with([
            'message' => 'Example deleted successfully',
            'buttons' => Example::all(),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function deleteSelected(Request $request)
    {

        $exampleIds = collect($request->products)->pluck('id');
        Example::destroy($exampleIds);

        return Redirect::back()->with([
            'message' => 'Selected examples deleted successfully',
            'buttons' => Example::all(),
        ]);
    }
}
