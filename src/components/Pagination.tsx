import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

type Props = {
  pages: number;
  page: number;
  setPage: (page: number) => any;
};

const Pagination = ({page, pages, setPage}: Props) => {
  return (
    <View style={styles.paginationContainer}>
      <TouchableOpacity
        style={styles.paginationItem}
        disabled={page === 1}
        onPress={() => setPage(page - 1)}>
        <Text style={styles.paginationText}>{`< `}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.paginationItem}
        disabled={page === pages}
        onPress={() => setPage(page + 1)}>
        <Text style={styles.paginationText}>{` >`}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.paginationItem}
        onPress={() => setPage(page)}>
        <Text style={[styles.paginationText, styles.activePage]}>{page}</Text>
      </TouchableOpacity>
      <Text style={styles.paginationText}>из</Text>
      <TouchableOpacity
        style={styles.paginationItem}
        onPress={() => setPage(pages)}>
        <Text style={styles.paginationText}>{pages}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  paginationContainer: {
    height: 30,
    display: 'flex',
    flexDirection: 'row',
  },
  paginationItem: {
    paddingHorizontal: 10,
  },
  paginationText: {
    fontSize: 20,
  },
  activePage: {
    color: 'blue',
  },
});
