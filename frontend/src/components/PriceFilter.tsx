type Props = {
  selectedPrice?: number;
  onChange: (value?: number) => void;
};

const PRICE_OPTIONS = [20, 30, 40, 50, 70, 100, 200, 300];

const PriceFilter = ({ selectedPrice, onChange }: Props) => {
  return (
    <div>
      <h4 className="text-md font-semibold mb-2">Max Price</h4>
      <select
        value={selectedPrice}
        className="p-2 border rounded-md w-full"
        onChange={(event) =>
          onChange(
            event.target.value ? parseInt(event.target.value) : undefined
          )
        }
      >
        <option value="">Select Max Price</option>
        {PRICE_OPTIONS.map((price) => (
          <option value={price} key={price}>
            {price}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PriceFilter;
