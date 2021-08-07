import "./profile.css"
import Feed from '../../components/feed/Feed'
import Rightbar from '../../components/rightbar/Rightbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Topbar from '../../components/topbar/Topbar'
import { useState,useEffect } from "react"
import axios from "axios"
import { useParams } from "react-router"

export default function Profile() {
    //声明基础地址
    const PF = process.env.REACT_APP_PUBLIC_FOlDER
    const [user,setUser] = useState({})
    //获取URL的请求变量,-----用户名
    const username = useParams().username

    useEffect(()=>{
        const fetchUser = async ()=>{
            const res = await axios.get(`/users?username=${username}`)
            setUser(res.data)
        }
        fetchUser()
    },[username])
    return (
        <>
            <Topbar/>
            <div className="profile">
                <Sidebar/>
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img 
                                className="profileCoverImg" 
                                src={user.coverPicture ? PF + user.coverPicture : PF+'person/noCover.png'} 
                                alt=""/>
                            <img 
                                className="profileUserImg" 
                                src={user.profilePicture ? PF + user.profilePicture : PF+'person/noAvatar.png'} 
                                alt=""/>
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{user.username}</h4>
                            <span className="profileInfoDesc">{user.desc}</span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed username={username}/>
                        <Rightbar user={user}/>
                    </div>
                </div>
                
            </div>
        </>
    )
}