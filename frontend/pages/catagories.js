import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@components/ui/card";
import { Input } from "@/components/ui/input";

function Catagories() {
  const [inputValues, setInputValues] = useState({});

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputValues((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Add Catagory</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex ">
              <Input
                className="m0-2"
                id="name"
                type="text"
                placeholder="Catagory Name"
                required
                name="email"
                value={inputValues.email || ""}
                onChange={handleChange}
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button>Save!</Button>
        </CardFooter>
      </Card>
    </>
  );
}

export default Catagories;
