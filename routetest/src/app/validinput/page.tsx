import { useState } from "react";
type Props={
    label:string;
    name:string;
    placeholder:string;
    pattern:string;
    errmsg:string;
    required:boolean;
    onValidChange:Function;
};
function ValidatedInput({label,name,placeholder,pattern,errmsg,required,onValidChange }:Props)
{
    const[clr,setclr]=useState("red");
    const[value,setValue]=useState("");
    const[error,setError]=useState(required?"This field is required":" ");
    const validate=(inputValue:any)=>{

        if(!inputValue){
            setError(required?"This field is required":" ");
            onValidChange(false);
            setclr("red");
            }
        else if(!new RegExp(pattern).test(inputValue)){
            setError(errmsg);
            setclr("red");
            onValidChange(false);
        }
        else{
            onValidChange(true);
            setError("");
            setclr("green");
        }
        
    };
    const handleChange = (e:any) => {
        const inputValue=e.target.value;
        setValue(inputValue);
        validate(inputValue);
    };
    return(
        <div>
            <label className="text-gray-700 font-bold">{label}:</label>
            <input type="text" value={value} name={name} onChange={handleChange} className={`border p-2 w-full rounded-md transition ${
          clr=="red" ? "border-red-500" : "border-green-500"
        }`} placeholder={placeholder}/>
            <br/>
            <span className="text-red-500 text-xs font-medium block text-center">{error}</span>

        </div>
    );
}
export default ValidatedInput;