import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useGetAllDriversQuery} from '../store/api/driversApi';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from 'App';
import {useAppDispatch, useAppSelector} from 'hooks/redux';
import Pagination from 'components/Pagination';
import {setPage} from 'store/reducers/driversReducer';

type Props = NativeStackScreenProps<RootStackParamList, 'Home', 'MyStack'>;

const Home = ({navigation}: Props) => {
  const {page} = useAppSelector(state => state.drivers);

  const {data, error, isLoading, refetch} = useGetAllDriversQuery(page);

  const dispatch = useAppDispatch();

  const onPageChangeHandler = (pageNumber: number) => {
    dispatch(setPage(pageNumber));
  };

  useEffect(() => {
    refetch();
  }, [page]);

  return isLoading ? (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" />
    </View>
  ) : (
    <View style={styles.container}>
      <Pagination
        page={page}
        pages={Math.ceil((data?.MRData.total || 0) / 30)}
        setPage={onPageChangeHandler}
      />
      <Text style={{padding: 10}}>
        Нажмите на гонщика чтобы получить больше информации
      </Text>
      <FlatList
        data={data?.MRData.DriverTable?.Drivers}
        renderItem={({item: driver, index}) => (
          <TouchableOpacity
            activeOpacity={0.7}
            key={index}
            onPress={() => {
              navigation.navigate('Driver', {
                driverId: driver.driverId,
                driverName: `${driver.givenName} ${driver.familyName}`,
              });
            }}>
            <Text style={styles.item}>
              {driver.familyName} {driver.givenName}
            </Text>
          </TouchableOpacity>
        )}
        style={{flex: 1}}
        scrollEnabled={true}
        keyExtractor={driver => driver.driverId}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 15,
    fontSize: 18,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
  },
});
