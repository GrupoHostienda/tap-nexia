<?php

namespace App\Exceptions;

use Symfony\Component\HttpFoundation\Response;
use Exception;


// Error to manage Validations errors
class ValidationException extends Exception
{
    protected array $customMessage;

    public function __construct($customMessage)
    {
        $this->customMessage=$customMessage;
    }

    public function getCustomMessage(){
        return $this->customMessage;
    }
    /** 
     * Report the exception. 
     * 
     * @return void 
     */
    public function report()
    {
    }
    /** 
     * Render the exception into an HTTP response. 
     * 
     * @param \Illuminate\Http\Request 
     * @return \Illuminate\Http\Response 
     */
    public function render()
    {
        $messages = [];

        // Flatten the array of messages into a single array of strings
        foreach ($this->getCustomMessage() as $field => $errors) {
            
            foreach ($errors->all() as $error) {
                $messages[] = "$error";
            }
        }


        return response()->json(
            [
                'error'=>'ValidationError',
                'message'=>$messages
            ]
            ,Response::HTTP_UNPROCESSABLE_ENTITY);

    }
}
