from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from channels.security.websocket import AllowedHostsOriginValidator
import bloodapp.routing

application = ProtocolTypeRouter({
    # (http -> django views is added by default)
    'websocket': AllowedHostsOriginValidator(
        AuthMiddlewareStack(
            URLRouter(
                bloodapp.routing.websocket_urlpatterns
            )
        ),
    ),
})

'''
ProtocolTypeRouter -> type of connection
AuthMiddlewareStack -> populate the connection scope to currently authenticated user
Channels provide channel_layer abstraction that enables communication between two instances of consumers
All Channel Layer methods are asynchronous
An event has a special 'type' key corresponding to the name of the method that should be invoked on consumers that receive the event.

'''
