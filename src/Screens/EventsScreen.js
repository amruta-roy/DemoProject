import React, { useEffect, useState } from 'react';
import { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity , 
    Image,
    Alert,
    ScrollView,
    StyleSheet
} from 'react-native';
import handImage from '../Assets/Images/wavingHand.png';
import bellIcon from '../Assets/Images/BellIcon.jpg';
import mapImage from '../Assets/Images/map.png';
import image1 from '../Assets/Images/concert4.webp';
import image2 from '../Assets/Images/concert2.jpeg';
import image3 from '../Assets/Images/concert3.jpg';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import * as Location from 'expo-location';
import EventDisplay from '../Components/EventsDisplay';

// API key to access Google API for location
let apiKey = 'AIzaSyCK8BVmC8oGrQmlAbELmnes0uZbBhKeLZY';

const EventsScreen = () => {

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [address, setAddress] = useState(null);
    const [searchTxt, setSearchTxt] = useState('');

    // Data to display today's event
    const todaysData = {
        name: 'Event name',
        date: 8,
        month: 'May',
        image: image2
    };

    // Data to display "Events for you"
    const yourEventData = [
        {
            name: 'Event name',
            date: 8,
            month: 'May',
            genre: 'Dance & Arts',
            time: "7:00 PM",
            image: image2
        },
        {
            name: 'Event name1',
            date: 9,
            month: 'May',
            genre: 'Dance & Arts',
            time: "7:30 PM",
            image: image3
        },
        {
            name: 'Event name2',
            date: 10,
            month: 'May',
            genre: 'Dance & Arts',
            time: "8:00 PM",
            image: image2
        }
    ];

    // Data to display "Popular Events"
    const popularEvents = [
        {
            name: 'Event name',
            date: 8,
            month: 'May',
            genre: 'Dance & Arts',
            time: "9:00 PM",
            image: image2
        },
        {
            name: 'Event name2',
            date: 9,
            month: 'May',
            genre: 'Music',
            time: "7:00 PM",
            image: image1
        },
    ];

    // Fetch the location of the user when screen is rendered for the first time
    useEffect(()=>{
        getLocation();
    },[]);

    // fucntion to fetch User's location using 'expo-location'
    const getLocation = async() => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
          }
    
          Location.setGoogleApiKey(apiKey);

          let { coords } = await Location.getCurrentPositionAsync();
    
          if (coords) {
            let { longitude, latitude } = coords;
    
            // fetch the location details from the available latitude and longitude values
            let regionName = await Location.reverseGeocodeAsync({
              longitude,
              latitude,
            });

            // save the City and Country to a state variable
            setAddress(regionName[0].city+", "+regionName[0].country);
          }
      };

    return(
        <ScrollView>
            <View style = { styles.container }>
                <View style = { styles.greetingsView }>
                    <View style={{ flexDirection:'row' }}>
                        <Text 
                            style={{ ...styles.txtLarge ,  marginTop: hp(1) }}>
                        Hi Bernd</Text>
                        <Image 
                            source={handImage} 
                            style={ styles.greetingsImg } />
                    </View>
                    <Image style={ styles.greetingsImg } source={bellIcon}/>
                </View>

                <View style={{height: hp(2)}}></View>

                {/* Display the Day and date */}

                <View style={{ flexDirection: 'row', justifyContent: "space-between"}}>
                    <View style={{ flexDirection: 'column', alignItems:'flex-start'}}>
                        <Text style={ styles.txtMedium }>Tuesday, 3 May</Text>
                        <Text style={{...styles.txtSmall, marginTop: hp(1)}}>{address ? address : errorMsg ? errorMsg : "Location not found"}</Text>
                    </View>
                    <Image 
                        source={mapImage} 
                        style={{height:hp(6), width:wp(13), borderRadius: 15}}/>
                </View>

                <View style={{height: hp(2)}}></View>

                {/* Search Box to search events */}
                <View style={{ paddingTop: wp(3) }}>
                    <TextInput
                        placeholder={"Search event..."}
                        placeholderTextColor={'grey'}
                        style={ styles.searchBox }
                        maxLength={50}
                        autoCorrect={false}
                        value={searchTxt}
                        clearButtonMode="always"
                        onChangeText={text => setSearchTxt(text)}
                    />
                </View>

                <View style={{height: hp(2)}}></View>

                {/* Display Today's event */}

                <Text style={{ ...styles.txtMedium, marginBottom: hp(1)}}>Today's event</Text>
                {/* Render data using "EventDisplay" component */}
                <EventDisplay 
                    eventType = "Todays" 
                    eventData = {todaysData} />

                <View style={{height: hp(5)}}></View>
                
                {/* Display the section "Events for you" */}

                <View style={{ flexDirection: 'row', justifyContent:'space-between', width: wp(92)}}>
                    <Text style={{ ...styles.txtMedium , marginBottom: hp(1)}}>Events for you</Text>
                    <TouchableOpacity
                        onPress={()=> Alert.alert("See all your events...")}>
                        <Text style={{ ...styles.txtMedium , marginBottom: hp(1)}}>See all</Text>
                    </TouchableOpacity>
                </View>

                {/* Create a horizontal ScrollView */}
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={true} style={{ flexDirection: 'row'}}>
                    {/* Map through the list of events and render data using "EventDisplay" component */}
                    { yourEventData.map((item) => {
                        return(
                            <View key={item.name} style={{ marginRight: wp(6)}}>
                                <EventDisplay 
                                    eventType = "Your" 
                                    eventData = {item} />
                            </View>
                        )
                    })}
                </ScrollView>

                <View style={{height: hp(5)}}></View>
                
                {/* Display the section "Popular Events" */}

                <View style={{ flexDirection: 'row', justifyContent:'space-between', width: wp(92), marginBottom: hp(1)}}>
                    <Text style={{ ...styles.txtMedium , marginBottom: hp(1)}}>Popular Events</Text>
                    <TouchableOpacity
                        onPress={()=> Alert.alert("See all Popular events...")}>
                        <Text style={{ ...styles.txtMedium , marginBottom: hp(1)}}>See all</Text>
                    </TouchableOpacity>
                </View>
                
                {/* Map through the list of popular events and render data using "EventDisplay" component */}
                {
                    popularEvents.map((item) => {
                        return(
                            <View key={item.name} style={{ marginBottom: hp(3)}}>
                                <EventDisplay 
                                    eventType = "Popular" 
                                    eventData = {item} />
                            </View>
                        )
                    })
                }
            </View>
        </ScrollView>
    )
}

export default EventsScreen;

const styles = StyleSheet.create( {
    container : {
        flex: 1 ,
        backgroundColor: '#000', 
        paddingHorizontal: wp(3), 
        paddingVertical: hp(5)
    },
    greetingsView : {
        flexDirection:'row', 
        justifyContent:'space-between', 
        height: hp(7), 
        width: wp(92)
    },
    greetingsImg : {
        height: hp(4), 
        width: wp(7), 
        margin: hp(1)
    },
    searchBox : {
        width: "100%",
        height: hp(6),
        alignSelf: "center",
        borderRadius: 10,
        backgroundColor: "#323232",
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    flexRow : {
        flexDirection:'row', 
        justifyContent:'space-between'
    },
    txtLarge : {
        color: '#fff', 
        fontSize: 28, 
        fontWeight:'bold'
    },
    txtMedium : {
        color: '#fff', 
        fontSize: 22 , 
        fontWeight: "bold"
    },
    txtSmall : {
        color: '#fff', 
        fontSize: 18 ,
        color: 'grey'
    }
})