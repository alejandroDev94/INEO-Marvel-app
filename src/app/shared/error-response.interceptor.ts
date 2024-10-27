import { HttpErrorResponse,  HttpInterceptorFn } from "@angular/common/http";
import { catchError, throwError } from "rxjs";

import { inject } from "@angular/core";
import { PopupService } from "../services/Utils/errorpopup/ErrorPopup.service";

export const ErrorResponseInterceptor:HttpInterceptorFn = (req,next) => {

    const popupService = inject(PopupService);
    return next(req).pipe(catchError((error: HttpErrorResponse) => handleErrorResponse(error, popupService)));

}
    


// Authorization Errors https://developer.marvel.com/documentation/authorization

// The following errors are returned by the Marvel Comics API when issues with authorization occur. These errors are returned by all endpoints.
// Error Code	Error Message	        Reason for occurring
// 409	        Missing API Key	        Occurs when the apikey parameter is not included with a request.
// 409	        Missing Hash	        Occurs when an apikey parameter is included with a request, a ts parameter is present, but no hash parameter is sent. Occurs on server-side applications only.
// 409	        Missing Timestamp	    Occurs when an apikey parameter is included with a request, a hash parameter is present, but no ts parameter is sent. Occurs on server-side applications only.
// 401	        Invalid Referer	        Occurs when a referrer which is not valid for the passed apikey parameter is sent.
// 401	        Invalid Hash	        Occurs when a ts, hash and apikey parameter are sent but the hash is not valid per the above hash generation rule.
// 405	        Method Not Allowed	    Occurs when an API endpoint is accessed using an HTTP verb which is not allowed for that endpoint.
// 403	        Forbidden	            Occurs when a user with an otherwise authenticated request attempts to access an endpoint to which they do not have access.

// GET /v1/public/characters ERROR CODES

// HTTP Status Code 	Reason
// 409 	Limit greater than 100.
// 409 	Limit invalid or below 1.
// 409 	Invalid or unrecognized parameter.
// 409 	Empty parameter.
// 409 	Invalid or unrecognized ordering parameter.
// 409 	Too many values sent to a multi-value list filter.
// 409 	Invalid value passed to filter.

function handleErrorResponse(error: HttpErrorResponse,popupService: PopupService) {
    console.log('Error Http Intercepted',error);
    
    popupService.showError(`Error status: ${error.error.code}, message: ${error.error.status}`);

    return throwError(() => `Error status: ${error.status}, message: ${error.message}`)
}