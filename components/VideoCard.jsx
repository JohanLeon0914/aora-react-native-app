import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { icons } from "../constants";
import { useState } from "react";
import { ResizeMode, Video } from "expo-av";
import { setBookmark } from "../lib/appwrite";
import { useDispatch, useSelector } from 'react-redux';

const VideoCard = ({
  video: {
    $id,
    title,
    thumbnail,
    video,
    bookmark,
    creator: { username, avatar },
  },
}) => {
  const [play, setPlay] = useState(false);
  const [manageBookmark, setManageBookmark] = useState(bookmark);

  const dispatch = useDispatch();
  const refresh = useSelector(state => state.refresh);

  const markVideo = async() => {
    try {
      await setBookmark($id, !manageBookmark);
      setManageBookmark(!manageBookmark);
      dispatch({ type: 'REFRESH' })
    } catch (error) {
      Alert("Error",  error.message);
    }
  }

  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>

          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="text-white font-psemibold text-sm"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {username}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={markVideo}
          className={`pt-2 ${manageBookmark && 'bg-secondary' }`}
        >
          <Image
            source={icons.bookmark}
            className="w-5 h-5"
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {play ? (
        <Video
          source={{ uri: video }}
          className="w-full h-60 rounded-xl mt-3"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="absolute w-12 h-12"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
