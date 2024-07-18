import { View, FlatList, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyState from "../../components/EmptyState";
import { getUserMarkPosts, signOut } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import VideoCard from "../../components/VideoCard";
import { useGlobalContext } from "../../context/GlobalProvider";
import { router } from "expo-router";
import { useEffect } from "react";
import SearchInput from "../../components/SearchInput";

const Bookmark = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();

  const { data: posts, refetch } = useAppwrite(() =>
    getUserMarkPosts(user.$id)
  );

  // useEffect(() => {
  //   refetch();
  // }, [query]);

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            {/* <SearchInput /> */}
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Marked"
            subtitle="Mark your first video"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Bookmark;
