import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { leadValidationSchema } from "../validations/leadValidation";
import { createLead } from "../services/leadService";

import { useNavigate } from "react-router-dom";

function CreateLead() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(leadValidationSchema)
  });

  const onSubmit = async (data) => {
    try {
      await createLead(data);

      alert("Lead created successfully");

      reset();

      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Failed to create lead");
    }
  };

  return (
    <div className="container">
      <h2>Create Lead</h2>

      <form onSubmit={handleSubmit(onSubmit)}>

        {/* Name */}
        <div className="form-group">
          <label>
              Name <span className="required">*</span>
          </label>
          <input {...register("name")} />
          <p className="error">{errors.name?.message}</p>
        </div>

        {/* Phone */}
        <div className="form-group">
          <label>Phone <span className="required">*</span></label>
          <input {...register("phone")} />
          <p className="error">{errors.phone?.message}</p>
        </div>

        {/* Email */}
        <div className="form-group">
          <label>Email</label>
          <input {...register("email")} />
          <p className="error">{errors.email?.message}</p>
        </div>

        {/* Budget */}
        <div className="form-group">
          <label>Budget <span className="required">*</span></label>
          <input type="number" {...register("budget")} />
          <p className="error">{errors.budget?.message}</p>
        </div>

        {/* Location */}
        <div className="form-group">
          <label>Location <span className="required">*</span></label>
          <input {...register("location")} />
        </div>

        {/* Property Type */}
        <div className="form-group">
          <label>Property Type <span className="required">*</span></label>

          <select {...register("property_type")}>
            <option value="">Select Property Type</option>
            <option value="1BHK">1BHK</option>
            <option value="2BHK">2BHK</option>
            <option value="3BHK">3BHK</option>
            <option value="4BHK">4BHK</option>
            <option value="Plot">Plot</option>
          </select>
        </div>

        {/* Source */}
        <div className="form-group">
          <label>Lead Source <span className="required">*</span></label>

          <select {...register("source")}>
            <option value="">Select Source</option>
            <option value="Facebook">Facebook</option>
            <option value="Google">Google</option>
            <option value="Referral">Referral</option>
          </select>
        </div>

        <button type="submit">Create Lead</button>

      </form>
    </div>
  );
}

export default CreateLead;