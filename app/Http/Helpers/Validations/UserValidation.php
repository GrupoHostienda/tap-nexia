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
}
