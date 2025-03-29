import { useState } from "react";
import ValidatedInput from "../validinput/page";
import { useRouter } from "next/navigation";
export default function Contact(){
     const [udata, setData] = useState({
        name: "",
        mail: "",
       content:"",
      });
      const router=useRouter();
    const[isNameValid,setIsNameValid]=useState<boolean>(false);
    const[isEmailValid,setIsEmailValid]=useState<boolean>(false);
    const[isContvalid,setisContvalid]=useState<boolean>(false);
    const[error,setError]=useState<string>("This field is required");
    const[clr,setClr]=useState<string>("red");
    const handleChange = (e: any) => {
        setData({
          ...udata,
          [e.target.name]: e.target.value,
        });
        console.log(udata);
    };
    const prjdesc = (prjdes: boolean) => {
        if (!prjdes) {
          setError("This field is required");
          setClr("red");
          setisContvalid(false);
        } else {
          setError("");
          setClr("green");
          setisContvalid(true);
        }
      };
      const isFormValid =
      isNameValid &&
      isEmailValid &&
      isContvalid;
      const handleSubmit = async(e: any) => {
        e.preventDefault();
       
            
        try {
            const response = await fetch("http://localhost:5000/contact", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(udata),
            });
            alert("Report sent successfully!");
            } catch (error) {
            console.error("Error Reporting:", error);
          }
         router.push("/");
        };
    return (
        <>
        <div className="pt-6 mt-16 bg-gray-100  flex flex-col items-center" id="contact">
            <form onSubmit={handleSubmit} onChange={handleChange}  className="max-w-3xl bg-white p-8 shadow-lg rounded-lg">
                <h1 className="text-center text-xl text-blue-600">Report to admin</h1>
                <ValidatedInput
                label="Name"
                name="name"
                placeholder="Enter your name"
                 pattern="^[A-Za-z. ]+$"
                errmsg="Please enter alphabet only"
                required={true}
                onValidChange={setIsNameValid}
                    />
                <ValidatedInput
                label="E-mail"
                name="mail"
                placeholder="Enter your email id"
                pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                errmsg="Please enter valid mail id"
                required={true}
                onValidChange={setIsEmailValid}
                    />
                     <div>
                     <label className="text-gray-700 font-bold">Content:</label>
                      <br />
                        <textarea
                            className={`border p-2 w-full rounded-md transition ${
                            clr === "red" ? "border-red-500" : "border-green-500"
                                }`}
                            onChange={(e: any) => prjdesc(e.target.value)}
                            name="content"
                            placeholder="Enter detailed description of your project"
                        ></textarea>
                        <br />
                        <span className="text-red-500 text-sm font-medium block">{error}</span>
                     </div>
                     <button
                        disabled={!isFormValid}
                        type="submit"
                        hidden={!isFormValid}
                        className="w-full bg-gray-600 text-white py-2 rounded-md hover:bg-blue-600 transition"
                          >
                           Send
                        </button>
            </form>
        </div>
        </>
    );
}