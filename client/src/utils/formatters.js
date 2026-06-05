export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

const categoryColors = {
  food: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
  transport: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  entertainment: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
  utilities: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
  health: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
  shopping: 'bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300',
  other: 'bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-300',
}

export function getCategoryColor(category) {
  return categoryColors[category?.toLowerCase()] || categoryColors.other
}
