from channels.routing import ProtocolTypeRouter,URLRouter
from channels.auth import AuthMiddlewareStack
import dr_chat.routing

application = ProtocolTypeRouter({
    # (http -> django views is added by default)
    'websocket':AuthMiddlewareStack(
        URLRouter(
            dr_chat.routing.websocket_urlpatterns
        )
    )    
})

'''
ProtocolTypeRouter -> type of connection
AuthMiddlewareStack -> populate the connection scope to currently authenticated user
Channels provide channel_layer abstraction that enables communication between two instances of consumers
All Channel Layer methods are asynchronous


'''