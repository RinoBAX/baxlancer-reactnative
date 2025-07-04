interface PaginationMeta {
  count: number;
  total_count: number;
  total_page: number;
}

interface PaginatedResult<T> extends PaginationMeta {
  data: T[];
}

interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  result: PaginatedResult<T>;
}

type ModalVariant =
  | "success"
  | "error"
  | "loading"
  | "action"
  | "info"
  | "warning";

type typeAccount = "VIRTUAL_ACCOUNT" | "NUMBER_ACCOUNT" | "EWALLET_ACCOUNT";
type bankAccount =
  | "BCA"
  | "BNI"
  | "BRI"
  | "MANDIRI"
  | "GOPAY"
  | "SHOPEEPAY"
  | "DANA"
  | "OVO";

interface BankAccountResponse {
  id: string;
  accountType: typeAccount;
  accountBank: bankAccount;
  accountName: string;
  accountNumber: string;
  createdAt: string;
  updatedAt: string;
}

// Response untuk getById
interface GetBankByIdResponse extends BankAccountResponse {}

// Response untuk getAll
// interface GetBanksResponse {
//   success: boolean;
//   message: string;
//   result: {
//     count: number;
//     total_count: number;
//     total_page: number;
//     next_page: number | null;
//     prev_page: number | null;
//     data: BankAccount[];
//   };
// }

interface Movie {
  id: number;
  title: string;
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface TrendingMovie {
  searchTerm: string;
  movie_id: number;
  title: string;
  count: number;
  poster_url: string;
}

interface MovieDetails {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  } | null;
  budget: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  original_language: string;
  original_title: string;
  overview: string | null;
  popularity: number;
  poster_path: string | null;
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date: string;
  revenue: number;
  runtime: number | null;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface TrendingCardProps {
  movie: TrendingMovie;
  index: number;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}
