<?php
namespace App\Http\Helpers\Validations;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Exceptions\ValidationException;
use App\Http\Helpers\Validations\Validation;
//Model
use App\Models\User;
/**
 *  Class to validate ClothingEquipment
 *
 * @param Request $request
 */
class UserValidation extends Validation {
    /**
     *  Validate register 
     *
     * @return body of request
     */
    public function register(){

        $data = $this->request->only(
            'username',
            'email',
            'password',
        );
        $rules = [
            'username' => 'required|string|unique:users',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:6|max:50',
        ];

        $validator = Validator::make($data,$rules);
        if (
            $validator->fails()
        ) {
            throw new ValidationException([$validator->errors()]);
        }
        // encript password
        $data['password'] = bcrypt($this->request->password);
        return $data;
    }
    /**
     *  Validate store link 
     *
     * @return body of request
     */
    public function storeLink(){
        $data = $this->request->only(
            'link_type_id',
            'style',
            'url',
            'title',
        );
        return $data;
    }
    /**
     *  Validate edit link 
     *
     * @return body of request
     */
    public function editLink(){
        $data = $this->request->only(
            'link_type_id',
            'style',
            'url',
            'title',
        );
        $rules = [
            'link_type_id' => 'required|numeric|exists:links',
            'style' => 'nullable|array',
            'url' => 'nullable|string',
            'title' => 'nullable|string',
        ];
        $validator = Validator::make($data,$rules);
        if (
            $validator->fails()
        ) {
            throw new ValidationException([$validator->errors()]);
        }
        return $data;
    }


    /**
     *  Validate edit link 
     *
     * @return array
     */
    public function update(){
        $data = $this->request->only(
            'username',
            'email',
            'password',
        );
        $rules = [
            'username' => 'nullable|alpha_num|unique:users',
            'email' => 'nullable|email|exists:users',
            'password' => 'nullable|string|min:6|max:50',
        ];

        $validator = Validator::make($data,$rules);
        if (
            $validator->fails()
        ) {
            throw new ValidationException([$validator->errors()]);
        }

        // encript password
        if($this->request->password){
            $data['password'] = bcrypt($this->request->password);
        }
        return $data;

    }
}
