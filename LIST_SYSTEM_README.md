# Reusable List View System

This system provides a comprehensive solution for handling large datasets (10M+ records) with pagination, global search, and individual field search capabilities.

## Features

- **High Performance**: Optimized for handling millions of records
- **Global Search**: Search across all searchable fields simultaneously
- **Individual Field Search**: Search specific columns independently
- **Sorting**: Click column headers to sort data
- **Pagination**: Configurable page sizes (10, 25, 50, 100)
- **Reusable Components**: Use the same system for any model/list

## Backend Components

### 1. Searchable Trait (`app/Traits/Searchable.php`)
Add this trait to any model that needs search functionality:

```php
use App\Traits\Searchable;

class YourModel extends Model
{
    use Searchable;
    
    protected function getSearchableFields(): array
    {
        return ['field1', 'field2', 'relationship.field'];
    }
}
```

### 2. HasListView Trait (`app/Traits/HasListView.php`)
Add this trait to controllers that need list functionality:

```php
use App\Traits\HasListView;

class YourController extends Controller
{
    use HasListView;
    
    public function index(Request $request)
    {
        $listData = $this->getListData($request, YourModel::class, $this->getColumns(), ['relationships']);
        return Inertia::render('YourModel/Index', $listData);
    }
    
    protected function getColumns(): array
    {
        return [
            ['key' => 'id', 'label' => 'ID', 'sortable' => true, 'searchable' => true],
            ['key' => 'name', 'label' => 'Name', 'sortable' => true, 'searchable' => true],
            // Add more columns...
        ];
    }
}
```

## Frontend Components

### DataTable Component (`resources/js/Components/DataTable.jsx`)
Reusable React component that handles:
- Data display in table format
- Search functionality (global and per-column)
- Sorting with visual indicators
- Pagination controls
- Responsive design

### Usage Example:
```jsx
import DataTable from '@/Components/DataTable';

export default function Index({ data, columns, filters, sortBy, sortOrder, perPage }) {
    return (
        <DataTable
            data={data}
            columns={columns}
            filters={filters}
            sortBy={sortBy}
            sortOrder={sortOrder}
            perPage={perPage}
            searchPlaceholder="Search records..."
        />
    );
}
```

## Column Configuration

Each column supports the following properties:

```javascript
{
    key: 'field_name',           // Database field name (supports relationships: 'user.name')
    label: 'Display Name',       // Column header text
    sortable: true,              // Enable/disable sorting
    searchable: true,            // Enable/disable individual field search
    render: (value, item) => {   // Optional custom renderer
        return `$${value}`;
    }
}
```

## Performance Optimizations

1. **Database Indexing**: Add indexes on frequently searched/sorted columns
2. **Eager Loading**: Load relationships to avoid N+1 queries
3. **Query Optimization**: The search uses LIKE queries with proper indexing
4. **Debounced Search**: Frontend implements 500ms debounce to reduce server requests

## Creating New List Views

1. **Add Searchable trait to your model**:
```php
class NewModel extends Model
{
    use Searchable;
    
    protected function getSearchableFields(): array
    {
        return ['searchable_field1', 'searchable_field2'];
    }
}
```

2. **Create controller with HasListView trait**:
```php
class NewModelController extends Controller
{
    use HasListView;
    
    public function index(Request $request)
    {
        $listData = $this->getListData($request, NewModel::class, $this->getColumns());
        return Inertia::render('NewModel/Index', $listData);
    }
    
    protected function getColumns(): array
    {
        return [
            // Define your columns here
        ];
    }
}
```

3. **Create React page component**:
```jsx
import DataTable from '@/Components/DataTable';

export default function Index(props) {
    return (
        <AuthenticatedLayout>
            <DataTable {...props} />
        </AuthenticatedLayout>
    );
}
```

4. **Add route**:
```php
Route::get('/new-models', [NewModelController::class, 'index'])->name('new-models.index');
```

## Database Recommendations

For optimal performance with large datasets:

```sql
-- Add indexes on frequently searched columns
CREATE INDEX idx_users_name ON users(name);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_created_at ON users(created_at);

-- For relationship searches
CREATE INDEX idx_products_category_id ON products(category_id);
```

## Example Implementation

See the included `UserController` and `ProductController` for complete working examples of how to implement this system for different models.