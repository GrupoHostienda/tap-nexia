<?php

namespace App\Http\Controllers;

use Symfony\Component\HttpFoundation\Response;

// Models
use App\Models\User;
use App\Models\Link;
use App\Models\LinkStyle;
use App\Models\UserLink;


use Illuminate\Http\Request;
use Inertia\Inertia;
// VAlidations
use App\Http\Helpers\Validations\UserValidation;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Landing/Index');
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
        //
    }
    /**
     * Store a link for user
     */
    public function addLink(Request $request)
    {
        $user = $this->currentUser();
        // Validate data
        $validation = new UserValidation($request);
        $data = $validation->storeLink();

        $link = Link::create([
            'link_type_id'=>$data['link_type_id'],
                   'title'=>$data['title'],
                     'url'=>$data['url'],
        ]);
        $style = LinkStyle::make([
            'style'=>$data['style']
        ]);
        $link->style()->save($style);

        UserLink::create([
            'user_id'=>$user->id,
            'link_id'=>$link->id
        ]);

        return response()->json([
            'message' => 'Link added.',
        ], Response::HTTP_OK);

    }
    /**
     * edit a link for user
     */
    public function editLink(Request $request,Link $link)
    {
        $user = $this->currentUser();
        // Validate data
        return $link;
        $validation = new UserValidation($request);
        $data = $validation->editLink();



        return response()->json([
            'message' => 'Link added.',
        ], Response::HTTP_OK);

    }
    /**
     * get all user links
     */
    public function links() {
        return $this->currentUser()->links->makeHidden(['link_type_id', 'laravel_through_key']);;
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        // Validate data
        $validation = new UserValidation($request);
        $data = $validation->update();

        $this->currentUser()->update($data);

        return response()->json([
            'message' => 'user updated.',
        ], Response::HTTP_OK);


    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }

    public function getUser(Request $request){
        return $this->currentUser();
    }
}
