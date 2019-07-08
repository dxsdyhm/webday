import { FETCH_USER_INFO} from  '../constants/types'
import axios from 'axios'

export const fetchUserAction = {
    fetchUserInfo ({ commit, state }, param) {
        commit(FETCH_USER_INFO,param)  
    },
	getSelectDeviceInfo (){
		
	}
}