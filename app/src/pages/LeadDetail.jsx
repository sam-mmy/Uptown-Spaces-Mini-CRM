import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatDate } from "../utils/dateUtils";

import {
  getLeadById,
  updateLeadStatus
} from "../services/leadService";

import {
  getNotesByLeadId,
  addNote
} from "../services/noteService";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { noteValidationSchema } from "../validations/noteValidation";


function LeadDetail() {

  const { id } = useParams();

  const [lead, setLead] = useState(null);
  const [notes, setNotes] = useState([]);
  const [status, setStatus] = useState("");


  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(noteValidationSchema)
  });


  const fetchLead = async () => {

    const res = await getLeadById(id);

    setLead(res.data.data);

    setStatus(res.data.data.status);

  };


  const fetchNotes = async () => {

    const res = await getNotesByLeadId(id);

    setNotes(res.data.data);

  };


  useEffect(() => {

    fetchLead();
    fetchNotes();

  }, []);


  const handleStatusChange = async (value) => {

    await updateLeadStatus(id, value);

    setStatus(value);

  };


  const handleAddNote = async (data) => {

    await addNote({
      lead_id: id,
      note: data.note
    });

    reset();

    fetchNotes();

  };


  if (!lead) return null;


  return (

    <div className="lead-detail-wrapper">

      <h2 className="lead-detail-title">

        Lead Details

      </h2>


      {/* ================= DETAILS CARD ================= */}

      <div className="lead-detail-card">

        <div className="lead-detail-grid">

          <Detail label="Name" value={lead.name} />
          <Detail label="Phone" value={lead.phone} />
          <Detail label="Email" value={lead.email || "-"} />
          <Detail label="Budget" value={`₹ ${lead.budget}`} />
          <Detail label="Location" value={lead.location} />
          <Detail label="Source" value={lead.source} />

          {/* READ ONLY STATUS */}

          <Detail label="Current Status" value={status} />

        </div>

      </div>


      {/* ================= STATUS UPDATE CARD ================= */}

      <div className="lead-detail-card">

        <h3 className="section-title">

          Update Lead Status

        </h3>

        <div className="status-update-row">

          <select
            className="status-select"
            value={status}
            onChange={(e) =>
              handleStatusChange(e.target.value)
            }
          >

            <option>New</option>
            <option>Contacted</option>
            <option>Site Visit</option>
            <option>Closed</option>

          </select>

        </div>

      </div>


      {/* ================= NOTES CARD ================= */}

      <div className="lead-detail-card">

        <h3 className="notes-heading">

          Notes

        </h3>


        {notes.length === 0 && (

          <p className="empty-text">

            No notes added yet

          </p>

        )}


        {notes.map((note) => (

          <div
            key={note.id}
            className="note-card"
          >

            <div className="note-text">

              {note.note}

            </div>

            <div className="note-time">

              {formatDate(note.created_at)}

            </div>

          </div>

        ))}


        {/* ADD NOTE FORM */}

        <form
          className="note-input-row"
          onSubmit={handleSubmit(handleAddNote)}
        >

          <textarea
            rows={3}
            maxLength={500}
            className="note-input"
            placeholder="Add note..."
            {...register("note")}
            style={{
              resize: "vertical",
              minHeight: "6em",
              maxHeight: "10em",
              lineHeight: 2
            }}
          />


          <button
            style={{ width: "15%" }}
            className="primary-btn"
            type="submit"
          >

            Add Note

          </button>

        </form>


        {/* CHARACTER COUNTER */}

        <div className="char-counter">

          {(watch("note") || "").length}/500

        </div>


        {/* ERROR MESSAGE */}

        <p className="error">

          {errors.note?.message}

        </p>

      </div>

    </div>

  );

}


function Detail({ label, value }) {

  return (

    <div className="detail-block">

      <span className="detail-label">

        {label}

      </span>

      <span className="detail-value">

        {value}

      </span>

    </div>

  );

}


export default LeadDetail;