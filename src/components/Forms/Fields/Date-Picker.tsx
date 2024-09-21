import { FieldInputProps, FormikProps } from "formik";
import { get } from "lodash";
import { Calendar } from "primereact/calendar";
import { ControlError } from "../../ControlError/ControlError";
import { Fragment } from "react/jsx-runtime";
import { Skeleton } from "primereact/skeleton";
import dayjs from "dayjs";
enum View {
    MONTH = "month",
    YEAR = "year"
}
interface IProps {
    form:FormikProps<any>
    field:FieldInputProps<any>,
    placeholder?:string,
    dateFormat?:string,
    isLoading?:boolean,
    view?: View
}
export const DatePicker:React.FC<IProps> = (props) => {
    const {form, field, placeholder,dateFormat, isLoading, view } = props
    const handleChangePicker = (e:any) => {
        const selectedDate = e.value;   
        if (selectedDate) {
            const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
            form.setFieldValue(field.name, dayjs(firstDayOfMonth).format('YYYY-MM-DD'))
        }
        
    }
    console.log(field.value, 'field');
    
    return (
        <div className="w-full">
            {isLoading ?  <Skeleton width="100%" height="3rem" /> :
        <Fragment>
            <Calendar view={view} dateFormat={dateFormat} className="w-full" placeholder={placeholder} id="date" value={dayjs(get(field, 'value')).toDate()} onChange={handleChangePicker} showIcon/>
            <ControlError form={form} field={field} />
        </Fragment>
}
        </div>
    );
};
