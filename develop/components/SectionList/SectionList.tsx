import React from 'react';
import { SectionList as RNSectionList, StyleSheet } from 'react-native';

interface SectionListProps {
  sections: any[];
  renderItem: ({ item, index, section }: any) => React.ReactElement;
  renderSectionHeader?: ({ section }: any) => React.ReactElement;
  keyExtractor?: (item: any, index: number) => string;
  style?: any;
}

export const SectionList: React.FC<SectionListProps> = ({ 
  sections, renderItem, renderSectionHeader, keyExtractor, style 
}) => {
  return (
    <RNSectionList
      sections={sections}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      keyExtractor={keyExtractor}
      style={[styles.sectionList, style]}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  sectionList: { flex: 1 },
});

export default SectionList;
