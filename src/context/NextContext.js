import React from 'react'

const NextContext = React.createContext({
    darkTheme:false,
    changeTheme: () =>{},
    showAdd:true,
    deleteAdd: () =>{},
    savedVideos: [],
    addToSaveVideos: () => {},
    removedSaveVideos: () => {}
})

export default NextContext
