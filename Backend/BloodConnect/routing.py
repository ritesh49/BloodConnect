from channels.routing import ProtocolTypeRouter

application = ProtocolTypeRouter({
    # (http -> django views is added bu default)
})