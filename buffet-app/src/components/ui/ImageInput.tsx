import Input from "./Input";
import LazyImage from "./LazyImage";

type ImageInputProps = {
  itemImage: string;
  itemName: string;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const ImageInput = ({
  itemImage,
  itemName,
  handleImageChange,
}: ImageInputProps) => {
  return (
    <label htmlFor="itemImage" className="m-auto w-48 cursor-pointer">
      {itemImage ? (
        <LazyImage image={itemImage} alt={itemName + "' image"} />
      ) : (
        <div className="flex h-[3rem] w-full items-center justify-center rounded-md border-2 border-descriptionColor">
          <span>Upload Image</span>
        </div>
      )}

      <Input
        type="file"
        id="itemImage"
        name="itemImage"
        onChange={handleImageChange}
        className="hidden"
        accept="image/png, image/jpeg"
      />
    </label>
  );
};

export default ImageInput;
