import React from 'react';
import { FlatList as RNFlatList, StyleSheet } from 'react-native';

interface FlatListProps {
  data: any[];
  renderItem: ({ item, index }: { item: any; index: number }) => React.ReactElement;
  keyExtractor?: (item: any, index: number) => string;
  horizontal?: boolean;
  numColumns?: number;
  style?: any;
}

export const FlatList: React.FC<FlatListProps> = ({ 
  data, renderItem, keyExtractor, horizontal = false, numColumns = 1, style 
}) => {
  return (
    <RNFlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      horizontal={horizontal}
      numColumns={numColumns}
      style={[styles.flatList, style]}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  flatList: { flex: 1 },
});

export default FlatList;
