<?php 
namespace App\Http\Helpers\Validations;

use Illuminate\Http\Request;

class Validation {
    protected Request $request;
    // Some reques from enpoint
    public function __construct(Request $request){
        $this->request = $request;
    }

    /**
     *  Validate store 
     *
     * @return body of request
     */
    public function store(){}
    /**
     *  Validate update 
     *
     * @return body of request
     */
    public function update(){}
    /**
     *  Validate find 
     *
     * @return body of request
     */
    public function find(){}
}
