import React from 'react';
import { 
    StyleSheet,
    Text, 
    View,
    TouchableOpacity , 
    Image, 
    ImageBackground,
    Alert,
} from 'react-native';
import { Icon } from "react-native-elements";
import microphone from '../Assets/Images/microphone.png';
import clock from '../Assets/Images/clock.jpg';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';


const DisplayDate = (props) => {
    return (
        <View style={{ flexDirection:'column', backgroundColor:'#fff', height: hp(props.height), width: wp(props.width) , borderRadius: 10, alignItems:'center', justifyContent:'center'}}>
            <Text style={{ color: '#000', fontSize: props.fontDate, fontWeight:'bold'}}>
                {props.date}
            </Text>
            <Text style={{ color: 'grey', fontSize: props.fontMonth,}}>
                {props.month}
            </Text>
        </View>
    )
}

const EventsDisplay = (props) => {
    const eventType = props.eventType;
    const eventData = props.eventData;
    
    return (
        <>
            {
                // Display data for 'Todays' Event
                eventType == 'Todays' ? 
                (
                    <ImageBackground 
                        key={eventData.name}
                        source={eventData.image} 
                        resizeMode="cover" 
                        style={{ width: wp(92), height: hp(30), elevation:4 , flexDirection: 'column'}} imageStyle={{ borderRadius: 25}}>

                        <View style={{ flex: 1, ...styles.flexRowSpace , marginVertical: hp(2) , marginHorizontal: wp(5) , borderRadius: 50}}>
                            <Text style={ styles.txtLarge }>
                                {eventData.name}
                            </Text>
                            <DisplayDate 
                                date={eventData.date} 
                                month={eventData.month} 
                                height={6.5} 
                                width={12} 
                                fontDate={18} 
                                fontMonth={12}/>
                        </View>
                        <TouchableOpacity 
                            style={{flexDirection:'row', justifyContent:'flex-end', paddingBottom: hp(3), paddingRight: wp(4)}} 
                            onPress={()=> Alert.alert("Displaying your ticket...")}>
                        
                            <Text style={{ color: '#fff', fontSize:22}}>Go to ticket</Text>
                            <Icon
                                name="arrow-right"
                                size={22}
                                color={'#fff'}
                                type="feather"
                                style={{ marginTop: hp(0.5)}}
                            />
                        </TouchableOpacity>
                    </ImageBackground>
                )
                : eventType == 'Your' ? (

                    // Display data for "Events for You"

                    <ImageBackground
                        key={eventData.name}
                        source={eventData.image} 
                        resizeMode="cover"
                        style={{ width: wp(60), height: hp(20), elevation:4 , flexDirection: 'column', padding: wp(1)}} imageStyle={{ borderRadius: 25}}>

                        <View style={{ flex: 1, flexDirection:'row', justifyContent:'flex-end', marginVertical: hp(1) , marginHorizontal: wp(5) , borderRadius: 50}}>
                            <DisplayDate 
                                date={eventData.date} 
                                month={eventData.month} 
                                height={5} 
                                width={10} 
                                fontDate={16} 
                                fontMonth={10}/>                        
                        </View>
                        <View style={{ ...styles.flexRowStart , paddingBottom: hp(1), paddingRight: wp(4)}}>
                            <Text style={ styles.txtMedium }>
                                {eventData.name}
                            </Text>
                        </View>
                        <View style={{ ...styles.flexRowSpace , paddingBottom: hp(1)}}>
                            <View style={{ ...styles.flexRowStart }}>
                                <Image 
                                    source={microphone} 
                                    style={{ height: hp(2) , width: wp(5)}}/>
                                <Text style={{ color: '#fff', fontSize: 14, paddingLeft: wp(1.5)}}>
                                    {eventData.genre}
                                </Text>
                            </View>
                            <View style={{ flexDirection:'row', justifyContent:'flex-end'}}>
                                <Image 
                                    source={clock} 
                                    style={{ height: hp(2) , width: wp(5)}}/>
                                <Text style={{ color: '#fff', fontSize: 14, paddingLeft: wp(1)}}>
                                    {eventData.time}
                                </Text>
                            </View>
                        </View>
                    </ImageBackground>
                )
                : eventType == 'Popular' ? (
                    // Display data for 'Popular' Event
                    <ImageBackground
                        key={eventData.name}
                        source={ eventData.image } 
                        resizeMode="cover" 
                        style={{ width: wp(92), height: hp(40), elevation:4 , flexDirection: 'column', padding: wp(1)}} imageStyle={{ borderRadius: 25}}>

                        <View style={{ flex: 1, flexDirection:'row', justifyContent:'flex-end', marginVertical: hp(1) , marginHorizontal: wp(5) , borderRadius: 50}}>
                            <DisplayDate 
                                date={eventData.date} 
                                month={eventData.month} 
                                height={7} 
                                width={16} 
                                fontDate={20} 
                                fontMonth={14}/>
                        </View>
                        <View style={{ ...styles.flexRowStart , paddingBottom: hp(1), paddingRight: wp(4)}}>
                            <Text style={ styles.txtMedium }>
                                {eventData.name}
                            </Text>
                        </View>
                        <View style={{ ...styles.flexRowSpace , paddingBottom: hp(1)}}>
                            <View style={{ ...styles.flexRowStart }}>
                                <Image 
                                    source={microphone} 
                                    style={{ height: hp(2) , width: wp(5)}}/>
                                <Text style={{ color: '#fff', fontSize: 14, paddingLeft: wp(1.5)}}>
                                    {eventData.genre}
                                </Text>
                            </View>
                            <View style={{ flexDirection:'row', justifyContent:'flex-end'}}>
                                <Image 
                                    source={clock} 
                                    style={{ height: hp(2) , width: wp(5)}}/>
                                <Text style={{ color: '#fff', fontSize: 14, paddingLeft: wp(1)}}>
                                    {eventData.time}
                                </Text>
                            </View>
                        </View>
                    </ImageBackground>
                )
                : null
            }
        </>
    );
}

export default EventsDisplay;

const styles = StyleSheet.create({
    txtLarge : {
        color: '#fff', 
        fontSize: 24, 
        fontWeight:'bold'
    },
    txtMedium : {
        color: '#fff', 
        fontSize: 20 , 
        fontWeight: "bold"
    },
    flexRowSpace: {
        flexDirection:'row', 
        justifyContent:'space-between'
    },
    flexRowStart : {
        flexDirection:'row', 
        justifyContent:'flex-start'
    }
});
