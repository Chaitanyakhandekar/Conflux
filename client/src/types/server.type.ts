export type ServerType={
    icon:React.JSX.Element | "<></>",
    label:string,
    desc:string,
    type:"GAMING" | "STUDY" | "DEVELOPER" | "STARTUP" | "CUSTOM"
  }

export type CreateServerType =  {
    description: string,
    serverType: "GAMING" | "STUDY" | "DEVELOPER" | "STARTUP" | "CUSTOM"
  }

export type IdealServerType ={
    _id : string | any
    name : string
    serverType: "GAMING" | "STUDY" | "DEVELOPER" | "STARTUP" | "CUSTOM"
    description: string,
    createdAt:Date
    updatedAt:Date
    gradient?:string
}