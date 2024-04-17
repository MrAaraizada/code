import React from "react";

export interface PolymorphicProps<T extends React.ElementType> {
  as?: T;
  children?: React.ReactNode;
}

export type ComponentProps<T extends React.ElementType> = 
  PolymorphicProps<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof PolymorphicProps<T>>;
