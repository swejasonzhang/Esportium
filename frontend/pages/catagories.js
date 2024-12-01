import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Dashboard</CardTitle>
          <CardDescription>
            Used to identify your store in the marketplace.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              name="email"
              value={inputValues.email || ""}
              onChange={handleChange}
            />
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
