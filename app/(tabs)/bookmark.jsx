import { View, FlatList, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyState from "../../components/EmptyState";
import { getUserMarkPosts, signOut } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import VideoCard from "../../components/VideoCard";
import { useGlobalContext } from "../../context/GlobalProvider";
import { useEffect } from "react";
import { useSelector } from 'react-redux';

const Bookmark = () => {
  const { user } = useGlobalContext();
  const refresh = useSelector(state => state.refresh);

  const { data: posts, refetch } = useAppwrite(() =>
    getUserMarkPosts(user.$id)
  );

  useEffect(() => {
    refetch();
  }, [refresh]);

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
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
