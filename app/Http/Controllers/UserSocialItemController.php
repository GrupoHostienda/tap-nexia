<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\UserItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
// Model
use App\Models\UserSocialItem;

class UserSocialItemController extends Controller
{
     /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Social/index', [
            'socialItems' => $this->currentUser()->socials,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = $this->currentUser();

        $items = UserSocialItem::make($request->all());
        
        $user->socials()->save($items);

        return Redirect::back()->with([
            'message' => 'Social created successfully',
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(UserSocialItem $userSocialItem)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(UserSocialItem $userSocialItem)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $user = $this->currentUser();

        $item = $user->socials()->find($request->id);
        $item->update($request->all());
        $user->items()->save($item);
        

        return Redirect::back()->with([
            'message' => 'Social updated successfully',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, $id)
    {
        $user = $this->currentUser();

        $item = $user->socials()->find($id)->delete();

        return Redirect::back()->with([
            'message' => 'Social deleted successfully',
            'buttons' => UserItem::all(),
        ]);
    }
    /**
     * Remove the specified resource from storage.
     */
    public function deleteSelected(Request $request)
    {

        $exampleIds = collect($request->socialItems)->pluck('id');
        UserSocialItem::destroy($exampleIds);

        return Redirect::back()->with([
            'message' => 'Selected social deleted successfully',
            'buttons' => UserSocialItem::all(),
        ]);
    }
}
