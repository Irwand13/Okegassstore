import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string

// ✅ Support dua nama key: ANON_KEY (standar) atau PUBLISHABLE_KEY (format baru Supabase)
const supabaseAnonKey = (
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
) as string

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Supabase: VITE_SUPABASE_URL atau VITE_SUPABASE_ANON_KEY belum diisi di .env')
}

export const supabase = createClient(
  supabaseUrl      || 'https://placeholder.supabase.co',
  supabaseAnonKey  || 'placeholder-key'
)

// ─── Types ────────────────────────────────────────────────────────

export type Profile = {
  id: string
  username: string | null
  full_name: string | null
  phone: string | null
  avatar_url: string | null
  bio: string | null
  balance: number
  total_sales: number
  total_reviews: number
  rating_sum: number
  is_verified_seller: boolean
  is_banned: boolean
  created_at: string
  updated_at: string
}

export type GameCategory = {
  id: string
  name: string
  icon: string | null
  color: string | null
  is_active: boolean
  sort_order: number
}

export type Listing = {
  id: string
  seller_id: string
  game_id: string
  title: string
  description: string | null
  price: number
  account_level: number | null
  account_rank: string | null
  account_server: string | null
  heroes_count: number | null
  skins_count: number | null
  win_rate: number | null
  total_matches: number | null
  login_type: string | null
  images: string[]
  video_url: string | null
  status: 'draft' | 'active' | 'sold' | 'expired' | 'banned' | 'deleted'
  is_negotiable: boolean
  view_count: number
  wishlist_count: number
  published_at: string
  sold_at: string | null
  expires_at: string
  created_at: string
  updated_at: string
}

export type Order = {
  id: string
  listing_id: string
  buyer_id: string
  seller_id: string
  price: number
  platform_fee: number
  seller_amount: number
  payment_method: string | null
  midtrans_order_id: string | null
  paid_at: string | null
  account_data: Record<string, string> | null
  delivered_at: string | null
  completed_at: string | null
  auto_complete_at: string | null
  status: 'waiting_payment' | 'paid' | 'processing' | 'delivered' | 'completed' | 'disputed' | 'refunded' | 'cancelled'
  dispute_reason: string | null
  created_at: string
  updated_at: string
}

export type Review = {
  id: string
  order_id: string
  listing_id: string
  reviewer_id: string
  seller_id: string
  rating: number
  comment: string | null
  seller_reply: string | null
  seller_replied_at: string | null
  created_at: string
}

export type Notification = {
  id: string
  user_id: string
  order_id: string | null
  type: string
  title: string
  message: string
  is_read: boolean
  created_at: string
}

export type WalletLog = {
  id: string
  user_id: string
  order_id: string | null
  action: 'topup' | 'spend' | 'refund' | 'bonus' | 'withdrawal'
  amount: number
  balance_before: number
  balance_after: number
  note: string | null
  created_at: string
}

// ─── Auth ─────────────────────────────────────────────────────────

export const signUp = async (email: string, password: string, username: string, fullName: string) => {
  const { data, error } = await supabase.auth.signUp({
    email, password,
    options: { data: { username, full_name: fullName } }
  })
  return { data, error }
}

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  return { data, error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const getSession = async () => {
  const { data: { session } } = await supabase.auth.getSession()
  return session
}

export const changePassword = async (newPassword: string) => {
  const { data, error } = await supabase.auth.updateUser({ password: newPassword })
  return { data, error }
}

// ─── Profile ──────────────────────────────────────────────────────

export const getProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()
  return { data: data as Profile | null, error }
}

export const updateProfile = async (userId: string, payload: Partial<Profile>) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(payload)
    .eq('id', userId)
    .select()
    .single()
  return { data, error }
}

// ─── Game Categories ──────────────────────────────────────────────

export const getGameCategories = async () => {
  const { data, error } = await supabase
    .from('game_categories')
    .select('*')
    .eq('is_active', true)
    .order('sort_order')
  return { data: data as GameCategory[] | null, error }
}

// ─── Listings ─────────────────────────────────────────────────────

export const getListings = async (filters?: {
  game_id?: string
  min_price?: number
  max_price?: number
  limit?: number
  offset?: number
}) => {
  let query = supabase
    .from('listings')
    .select(`
      *,
      profiles:seller_id (username, avatar_url, is_verified_seller, rating_sum, total_reviews),
      game_categories:game_id (name, icon, color)
    `)
    .eq('status', 'active')
    .order('created_at', { ascending: false })

  if (filters?.game_id)   query = query.eq('game_id', filters.game_id)
  if (filters?.min_price) query = query.gte('price', filters.min_price)
  if (filters?.max_price) query = query.lte('price', filters.max_price)
  if (filters?.limit)     query = query.limit(filters.limit)
  if (filters?.offset)    query = query.range(filters.offset, filters.offset + (filters.limit ?? 20) - 1)

  const { data, error } = await query
  return { data, error }
}

export const getListingById = async (id: string) => {
  const { data, error } = await supabase
    .from('listings')
    .select(`
      *,
      profiles:seller_id (id, username, avatar_url, is_verified_seller, rating_sum, total_reviews, total_sales, created_at),
      game_categories:game_id (name, icon, color),
      listing_tags (tag)
    `)
    .eq('id', id)
    .single()
  return { data, error }
}

export const getMyListings = async (sellerId: string) => {
  const { data, error } = await supabase
    .from('listings')
    .select('*, game_categories:game_id (name, icon)')
    .eq('seller_id', sellerId)
    .order('created_at', { ascending: false })
  return { data, error }
}

export const createListing = async (payload: Partial<Listing>) => {
  const { data, error } = await supabase
    .from('listings')
    .insert(payload)
    .select()
    .single()
  return { data, error }
}

export const updateListing = async (id: string, payload: Partial<Listing>) => {
  const { data, error } = await supabase
    .from('listings')
    .update(payload)
    .eq('id', id)
    .select()
    .single()
  return { data, error }
}

export const incrementViewCount = async (id: string) => {
  await supabase.rpc('increment_view_count', { listing_id: id })
}

// ─── Orders ───────────────────────────────────────────────────────

const PLATFORM_FEE_PERCENT = 5

export const createOrder = async (listing: Listing, buyerId: string, paymentMethod: string) => {
  const platform_fee  = Math.floor(listing.price * PLATFORM_FEE_PERCENT / 100)
  const seller_amount = listing.price - platform_fee

  const { data, error } = await supabase
    .from('orders')
    .insert({
      listing_id:       listing.id,
      buyer_id:         buyerId,
      seller_id:        listing.seller_id,
      price:            listing.price,
      platform_fee,
      seller_amount,
      payment_method:   paymentMethod,
      auto_complete_at: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    })
    .select()
    .single()
  return { data, error }
}

export const getMyOrders = async (userId: string, role: 'buyer' | 'seller') => {
  const column = role === 'buyer' ? 'buyer_id' : 'seller_id'
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      listings:listing_id (title, images, game_id),
      buyer:buyer_id (username, avatar_url),
      seller:seller_id (username, avatar_url)
    `)
    .eq(column, userId)
    .order('created_at', { ascending: false })
  return { data, error }
}

export const updateOrderStatus = async (orderId: string, status: Order['status'], extra?: Partial<Order>) => {
  const { data, error } = await supabase
    .from('orders')
    .update({ status, updated_at: new Date().toISOString(), ...extra })
    .eq('id', orderId)
    .select()
    .single()
  return { data, error }
}

// ─── Wishlist ─────────────────────────────────────────────────────

export const toggleWishlist = async (userId: string, listingId: string) => {
  const { data: existing } = await supabase
    .from('wishlists')
    .select('*')
    .eq('user_id', userId)
    .eq('listing_id', listingId)
    .single()

  if (existing) {
    await supabase.from('wishlists').delete()
      .eq('user_id', userId).eq('listing_id', listingId)
    return { wishlisted: false }
  } else {
    await supabase.from('wishlists').insert({ user_id: userId, listing_id: listingId })
    return { wishlisted: true }
  }
}

export const getMyWishlist = async (userId: string) => {
  const { data, error } = await supabase
    .from('wishlists')
    .select('*, listings:listing_id (*, game_categories:game_id (name, icon))')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  return { data, error }
}

// ─── Reviews ──────────────────────────────────────────────────────

export const getSellerReviews = async (sellerId: string) => {
  const { data, error } = await supabase
    .from('reviews')
    .select('*, profiles:reviewer_id (username, avatar_url)')
    .eq('seller_id', sellerId)
    .order('created_at', { ascending: false })
  return { data, error }
}

export const createReview = async (payload: Partial<Review>) => {
  const { data, error } = await supabase
    .from('reviews')
    .insert(payload)
    .select()
    .single()
  return { data, error }
}

// ─── Notifications ────────────────────────────────────────────────

export const getNotifications = async (userId: string) => {
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(20)
  return { data, error }
}

export const markNotifRead = async (notifId: string) => {
  await supabase.from('notifications').update({ is_read: true }).eq('id', notifId)
}

export const markAllNotifsRead = async (userId: string) => {
  await supabase.from('notifications').update({ is_read: true }).eq('user_id', userId)
}

// ─── Wallet ───────────────────────────────────────────────────────

export const getWalletLogs = async (userId: string) => {
  const { data, error } = await supabase
    .from('wallet_logs')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  return { data: data as WalletLog[] | null, error }
}