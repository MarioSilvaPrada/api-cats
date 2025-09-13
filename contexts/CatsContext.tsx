import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";

interface Category {
  id: number;
  name: string;
}

interface Breed {
  id: string;
  weight: { imperial: string; metric: string };
  name: string;
  temperament: string;
  origin: string;
  country_codes: string;
  country_code: string;
  life_span: string;
  wikipedia_url: string;
}

export interface CatImage {
  id: string;
  breeds: Breed[];
  categories: Category[];
  height: number;
  url: string;
  width: number;
}

interface CatsContextType {
  cats: CatImage[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  likedCats: CatImage[];
  dislikedCats: CatImage[];
  likeCat: (cat: CatImage) => void;
  dislikeCat: (cat: CatImage) => void;
}

const CatsContext = createContext<CatsContextType | undefined>(undefined);

interface CatsProviderProps {
  children: ReactNode;
}

export const CatsProvider: React.FC<CatsProviderProps> = ({ children }) => {
  const [cats, setCats] = useState<CatImage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [likedCats, setLikedCats] = useState<CatImage[]>([]);
  const [dislikedCats, setDislikedCats] = useState<CatImage[]>([]);

  const fetchCats = async () => {
    try {
      setLoading(true);
      setError(null);

      const thisShouldBeAEnvVarIKnow =
        "live_oHEMGdbndXG9uC0vVGCEj41LrE8DcNt6ELKOGPwTnHO3KtKJQ1yl3qLwE3VoLkVq";

      const response = await fetch(
        "https://api.thecatapi.com/v1/images/search?limit=20&has_breeds=1",
        {
          headers: {
            "x-api-key": thisShouldBeAEnvVarIKnow,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: CatImage[] = await response.json();
      setCats(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while fetching cats"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCats();
  }, []);

  const likeCat = (cat: CatImage) => {
    setLikedCats((prev) => {
      if (prev.some((likedCat) => likedCat.id === cat.id)) {
        return prev;
      }
      return [...prev, cat];
    });

    // Remove from disliked if it was there
    setDislikedCats((prev) =>
      prev.filter((dislikedCat) => dislikedCat.id !== cat.id)
    );
  };

  const dislikeCat = (cat: CatImage) => {
    setDislikedCats((prev) => {
      if (prev.some((dislikedCat) => dislikedCat.id === cat.id)) {
        return prev;
      }
      return [...prev, cat];
    });

    // Remove from liked if it was there
    setLikedCats((prev) => prev.filter((likedCat) => likedCat.id !== cat.id));
  };

  const value: CatsContextType = {
    cats,
    loading,
    error,
    refetch: fetchCats,
    likedCats,
    dislikedCats,
    likeCat,
    dislikeCat,
  };

  return <CatsContext.Provider value={value}>{children}</CatsContext.Provider>;
};

export const useCats = (): CatsContextType => {
  const context = useContext(CatsContext);
  if (context === undefined) {
    throw new Error("useCats must be used within a CatsProvider");
  }
  return context;
};
