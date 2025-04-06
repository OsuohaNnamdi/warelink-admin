import React, { useState, useEffect } from "react";
import { BiEnvelope, BiCheckCircle, BiTrash, BiReply, BiSearch } from "react-icons/bi";
import axios from "axios";
import { Api } from "../../APIs/Api";

export const SupportPage = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [replyContent, setReplyContent] = useState("");
  const [isReplying, setIsReplying] = useState(false);
  const [filter, setFilter] = useState("all"); // all, pending, resolved
  const [error, setError] = useState(null);

  // Fetch tickets from API
  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await Api.get('/api/support/');
        setTickets(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch support tickets');
        console.error("Error fetching tickets:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  // Filter tickets based on search and filter
  const filteredTickets = tickets
    .filter(ticket => {
      const matchesSearch = 
        ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        `${ticket.user.firstname} ${ticket.user.lastname}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.user.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilter = 
        filter === "all" || 
        (filter === "pending" && !ticket.is_resolved) || 
        (filter === "resolved" && ticket.is_resolved);
      
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  const handleReply = async () => {
    if (!selectedTicket || !replyContent.trim()) return;
    
    setIsReplying(true);
    setError(null);
    try {
      // In a real implementation, you would POST to a replies endpoint
      // For now, we'll simulate it by updating local state
      const updatedTicket = {
        ...selectedTicket,
        replies: [
          ...(selectedTicket.replies || []),
          {
            id: Date.now(),
            content: replyContent,
            admin: true,
            created_at: new Date().toISOString()
          }
        ]
      };

      setTickets(tickets.map(t => t.id === selectedTicket.id ? updatedTicket : t));
      setSelectedTicket(updatedTicket);
      setReplyContent("");
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send reply');
      console.error("Error sending reply:", err);
    } finally {
      setIsReplying(false);
    }
  };

  const handleResolve = async (ticketId) => {
    try {
      await Api.patch(`/api/support/${ticketId}/`, { is_resolved: true });
      setTickets(tickets.map(t => 
        t.id === ticketId ? { ...t, is_resolved: true } : t
      ));
      if (selectedTicket?.id === ticketId) {
        setSelectedTicket({ ...selectedTicket, is_resolved: true });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to resolve ticket');
      console.error("Error resolving ticket:", err);
    }
  };

  const handleDelete = async (ticketId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this ticket?");
    if (!confirmDelete) return;
    
    try {
      await Api.delete(`/api/support/${ticketId}/`);
      setTickets(tickets.filter(t => t.id !== ticketId));
      if (selectedTicket?.id === ticketId) {
        setSelectedTicket(null);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete ticket');
      console.error("Error deleting ticket:", err);
    }
  };

  return (
    <main className="main-content-wrapper">
      <div className="container">
        <div className="row mb-8">
          <div className="col-md-12">
            <div>
              <h2>Support Tickets</h2>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item"><a href="#" className="text-inherit">Dashboard</a></li>
                  <li className="breadcrumb-item active" aria-current="page">Support</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>

        {error && (
          <div className="row mb-4">
            <div className="col-12">
              <div className="alert alert-danger">{error}</div>
            </div>
          </div>
        )}

        <div className="row">
          <div className="col-12">
            <div className="card mb-6">
              <div className="card-body p-6">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-4">
                  <div className="search-bar position-relative w-100 w-md-auto">
                    <BiSearch className="position-absolute top-50 start-0 translate-middle-y ms-3" />
                    <input
                      type="text"
                      className="form-control ps-6"
                      placeholder="Search tickets..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <div className="d-flex gap-2">
                    <select 
                      className="form-select"
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                    >
                      <option value="all">All Tickets</option>
                      <option value="pending">Pending</option>
                      <option value="resolved">Resolved</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-body p-0">
                {loading ? (
                  <div className="text-center py-10">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : filteredTickets.length === 0 ? (
                  <div className="text-center py-10">
                    <BiEnvelope size={48} className="text-muted mb-3" />
                    <h4>No tickets found</h4>
                    <p className="text-muted">No support tickets match your criteria</p>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover mb-0">
                      <thead className="bg-light">
                        <tr>
                          <th>User</th>
                          <th>Subject</th>
                          <th>Category</th>
                          <th>Date</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredTickets.map((ticket) => (
                          <tr 
                            key={ticket.id} 
                            className={ticket === selectedTicket ? "table-active" : ""}
                            onClick={() => setSelectedTicket(ticket)}
                            style={{ cursor: "pointer" }}
                          >
                            <td>
                              <div className="d-flex align-items-center">
                                <div className="avatar avatar-xs me-3">
                                  <span className="avatar-initial rounded-circle bg-primary">
                                    {ticket.user.firstname.charAt(0)}{ticket.user.lastname.charAt(0)}
                                  </span>
                                </div>
                                <div>
                                  <h6 className="mb-0">{ticket.user.firstname} {ticket.user.lastname}</h6>
                                  <small className="text-muted">{ticket.user.email}</small>
                                  <small className="d-block text-muted">{ticket.user.businessname}</small>
                                </div>
                              </div>
                            </td>
                            <td>{ticket.subject}</td>
                            <td>
                              <span className="badge bg-light text-dark text-capitalize">
                                {ticket.category}
                              </span>
                            </td>
                            <td>{new Date(ticket.created_at).toLocaleDateString()}</td>
                            <td>
                              {ticket.is_resolved ? (
                                <span className="badge bg-success">Resolved</span>
                              ) : (
                                <span className="badge bg-warning">Pending</span>
                              )}
                            </td>
                            <td>
                              <div className="d-flex gap-2">
                                <button 
                                  className="btn btn-sm btn-outline-primary"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedTicket(ticket);
                                  }}
                                >
                                  <BiReply />
                                </button>
                                {!ticket.is_resolved && (
                                  <button 
                                    className="btn btn-sm btn-outline-success"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleResolve(ticket.id);
                                    }}
                                  >
                                    <BiCheckCircle />
                                  </button>
                                )}
                                <button 
                                  className="btn btn-sm btn-outline-danger"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(ticket.id);
                                  }}
                                >
                                  <BiTrash />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Ticket Detail & Reply Modal */}
        {selectedTicket && (
          <div className="modal fade show" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Support Ticket: {selectedTicket.subject}</h5>
                  <button 
                    type="button" 
                    className="btn-close" 
                    onClick={() => setSelectedTicket(null)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-4">
                    <div className="d-flex justify-content-between mb-2">
                      <h6>
                        <span className="badge bg-light text-dark text-capitalize me-2">
                          {selectedTicket.category}
                        </span>
                        From: {selectedTicket.user.firstname} {selectedTicket.user.lastname} ({selectedTicket.user.email})
                      </h6>
                      <small className="text-muted">
                        {new Date(selectedTicket.created_at).toLocaleString()}
                      </small>
                    </div>
                    <div className="card bg-light p-3">
                      <p className="mb-0">{selectedTicket.message}</p>
                    </div>
                    <div className="mt-2">
                      <small className="text-muted">
                        Business: {selectedTicket.user.businessname} | {selectedTicket.user.businessaddress}
                      </small>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h6>Replies ({selectedTicket.replies?.length || 0})</h6>
                    {!selectedTicket.replies || selectedTicket.replies.length === 0 ? (
                      <p className="text-muted">No replies yet</p>
                    ) : (
                      <div className="list-group">
                        {selectedTicket.replies.map((reply) => (
                          <div 
                            key={reply.id} 
                            className={`list-group-item ${reply.admin ? "bg-light" : ""}`}
                          >
                            <div className="d-flex justify-content-between mb-1">
                              <strong>{reply.admin ? "Admin" : `${selectedTicket.user.firstname} ${selectedTicket.user.lastname}`}</strong>
                              <small className="text-muted">
                                {new Date(reply.created_at).toLocaleString()}
                              </small>
                            </div>
                            <p className="mb-0">{reply.content}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Reply</label>
                    <textarea
                      className="form-control"
                      rows={4}
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      placeholder="Type your response here..."
                    ></textarea>
                  </div>
                </div>
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => setSelectedTicket(null)}
                  >
                    Close
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={handleReply}
                    disabled={isReplying || !replyContent.trim()}
                  >
                    {isReplying ? "Sending..." : "Send Reply"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};