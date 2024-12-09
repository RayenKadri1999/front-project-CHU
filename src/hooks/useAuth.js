import parseJwt from '../common/parsejwt';

const useAuth = () => {
    const user = JSON.parse(localStorage.getItem("user"));


    // const token = useSelector(selectCurrentToken)
    let isManager = false
    let isAdmin = false
    let status = "normalUser"

    if (user) {
        
        const decoded = parseJwt(user.accessToken)
       
        const userId =decoded.userId
        const username = decoded.username
        const  role = decoded.role || 'nomalUser';

        isManager = role === 'superUser';
        isAdmin = role === 'admin';

        if (isManager) status = "superUser"
        if (isAdmin) status = "admin"

        return {userId, username, role, status, isManager, isAdmin }
    }

    return { username: '', role: [], isManager, isAdmin, status }
}
export default useAuth