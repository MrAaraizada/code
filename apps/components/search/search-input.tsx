"use client";

import React, { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SearchInputProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
}

export function SearchInput({ 
  placeholder = "Search components...", 
  onSearch,
  className 
}: SearchInputProps) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (onSearch) {
        onSearch(query);
      }
    }, 300);

    return () => clearTimeout(delayedSearch);
  }, [query, onSearch]);

  const clearSearch = () => {
    setQuery("");
    if (onSearch) {
      onSearch("");
    }
  };

  return (
    <div className={cn("relative", className)}>
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="pl-10 pr-10"
      />
      {query && (
        <Button
          variant="ghost"
          size="icon"
          onClick={clearSearch}
          className="absolute right-1 top-1/2 h-6 w-6 -translate-y-1/2"
        >
          <X className="h-3 w-3" />
        </Button>
      )}
    </div>
  );
}

interface SearchResult {
  id: string;
  title: string;
  description?: string;
  category?: string;
}

interface SearchResultsProps {
  results: SearchResult[];
  onSelect?: (result: SearchResult) => void;
  className?: string;
}

export function SearchResults({ results, onSelect, className }: SearchResultsProps) {
  if (results.length === 0) {
    return (
      <div className={cn("p-4 text-center text-muted-foreground", className)}>
        No results found
      </div>
    );
  }

  return (
    <div className={cn("space-y-2", className)}>
      {results.map((result) => (
        <div
          key={result.id}
          onClick={() => onSelect?.(result)}
          className="cursor-pointer rounded-lg border p-3 hover:bg-accent"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-medium">{result.title}</h3>
            {result.category && (
              <span className="text-xs text-muted-foreground">
                {result.category}
              </span>
            )}
          </div>
          {result.description && (
            <p className="mt-1 text-sm text-muted-foreground">
              {result.description}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
