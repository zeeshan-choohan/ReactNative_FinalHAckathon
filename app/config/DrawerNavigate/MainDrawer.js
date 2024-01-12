import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Admin from '../../admin/screen/Admin';


const Drawers = createDrawerNavigator()


function MainDarwer(){
    return(
        <Drawers.Navigator drawerContent={props =><DrawerContent {...props} />}>
            <Drawers.Screen name='Admin' component={Admin}
            // options={{
            //     headerShown:false
            // }}
            />
            {/* <Drawers.Screen name='GetStarted'
              options={{
                headerShown:false
            }}
            component={GetStarted}/> */}
        </Drawers.Navigator>

    )
}

export default MainDarwer