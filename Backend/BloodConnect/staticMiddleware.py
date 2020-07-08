from django.shortcuts import redirect
from django.http import HttpResponsePermanentRedirect,HttpResponseRedirect

def redirect_static_request(get_response):
    def middleware(request):
        response = get_response(request)
        print(request.path_info[0:8])
        print(type(request.path_info))
        print('/assets/' == request.path_info[0:8])
        print('/assets/' == request.path_info[0:8])
        print('/assets/' == request.path_info[0:8])
        print('/assets/' == request.path_info[0:8])
        print('/assets/' == request.path_info[0:8])
        if '/assets/' == request.path_info[0:8]:            
            request.path_info = '/static/front_end'+request.path_info
            print(request.path_info)
            print(request.path_info)
            print(request.path_info)
            print(request.path_info)
            print(request.path_info)
            print(request.path_info)
            HttpResponsePermanentRedirect(request.path_info)
            redirect(request.path_info)
            HttpResponseRedirect(request.path_info)
        return response
    return middleware