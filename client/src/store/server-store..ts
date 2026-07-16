import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"
import type { User } from "../types/user.type";
import type { IdealServerType } from "../types/server.type";

type ServerStoreType = {
    servers: IdealServerType[]  | [],
    selectedServer : IdealServerType | null,

    setServers: (servers:IdealServerType[]) => void,
    setSelectedServer: (server:IdealServerType) => void
    addServer: (server:IdealServerType) => void
}


export const useServerStore =  create<ServerStoreType>()(

    (set)=>({
        servers : [],
        selectedServer: null,

        setServers: (servers:IdealServerType[])=>{
            set({
                servers:servers
            })
        },

        addServer: (server:IdealServerType)=>{
            set((prev)=>({
                servers : [...prev.servers, server]
            }))
        },

        setSelectedServer:(server:IdealServerType)=>{
            set({
                selectedServer:server
            })
        }
    })
)