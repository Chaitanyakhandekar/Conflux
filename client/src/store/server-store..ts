import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"
import type { User } from "../types/user.type";
import type { CategoryType, ChannelType, IdealServerType } from "../types/server.type";

type ServerStoreType = {
    servers: IdealServerType[] | [],
    selectedServer: IdealServerType | null,
    categories: CategoryType[] | [],
    currentChannel: ChannelType | null,
    currentCategory: CategoryType | null

    setCategories: (categories: CategoryType[]) => void,
    setServers: (servers: IdealServerType[]) => void,
    setSelectedServer: (server: IdealServerType) => void
    addServer: (server: IdealServerType) => void
    setCurrentChannel: (channel: ChannelType) => void
    addChannel: (channel: ChannelType, categoryId: string) => void
    setCurrentCategory: (category: CategoryType) => void
}


export const useServerStore = create<ServerStoreType>()(

    (set) => ({
        servers: [],
        selectedServer: null,

        setServers: (servers: IdealServerType[]) => {
            set({
                servers: servers
            })
        },

        categories: [],
        currentChannel: null,
        currentCategory: null,

        addServer: (server: IdealServerType) => {
            set((prev) => ({
                servers: [...prev.servers, server]
            }))
        },

        setSelectedServer: (server: IdealServerType) => {
            set({
                selectedServer: server
            })
        },

        setCategories: (cats: CategoryType[]) => {
            set({
                categories: cats
            })
        },

        setCurrentChannel: (channel: ChannelType) => {
            set({
                currentChannel: channel
            })
        },

        addChannel: (channel: ChannelType, categoryId: string) => {
            set((prev) => ({
                categories: prev.categories.map((cat: CategoryType) => {
                    if (cat._id !== categoryId) {
                        return cat
                    }

                    cat.channels = [...cat.channels, channel]
                    return cat
                })
            }))
        },

        setCurrentCategory: (category: CategoryType) => {
            set({
                currentCategory: category
            })
        }

    })
)