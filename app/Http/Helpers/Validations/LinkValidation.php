<?php
namespace App\Http\Helpers\Validations;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Exceptions\ValidationException;
use App\Http\Helpers\Validations\Validation;
//Model
use App\Models\User;
use App\Models\Link;
/**
 *  Class to validate ClothingEquipment
 *
 * @param Request $request
 */
class LinkValidation extends Validation {
    public function update(){
        $data = $this->request->only(
            'url',
            'title',
            'isHidden',
        );
        $rules = [
            'url' => 'nullabel|string',
            'title' => 'nullable|string',
            'isHidden' => 'nullable|bool',
        ];

        $validator = Validator::make($data,$rules);
        if (
            $validator->fails()
        ) {
            throw new ValidationException([$validator->errors()]);
        }
    }
}
