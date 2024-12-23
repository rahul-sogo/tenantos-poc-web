"use client";

import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  Select,
  MenuItem,
  Switch,
  Checkbox,
  Divider,
  FormControlLabel,
} from "@mui/material";
import { getCurrentUsers } from "@/services/apiUsers";
import { getRemoteAgents } from "@/services/apiRemoteAgents";
import { createServer, getTags } from "@/services/apiServer";

const AddServerPopup: React.FC = () => {
  const [open, setOpen] = useState(true);
  const [users, setUsers] = useState<any[]>([]);
  const [remoteAgents, setRemoteAgents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [formSettings, setFormSettings] = useState({
    pxeProvisioning: false,
    ipmiPowerManagement: false,
    ipmiNoVNC: true,
    alwaysOnDHCP: false,
    redirectAfterCreation: false,
    clearInputs: true,
  });
  const [formData, setFormData] = useState({
    hostname: "",
    servername: "",
  });

  const [errors, setErrors] = useState({
    hostname: false,
    servername: false,
  });

  const handleInputChange =
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
      setErrors((prev) => ({
        ...prev,
        [field]: false,
      }));
    };

  const validateForm = () => {
    const newErrors = {
      hostname: !formData.hostname,
      servername: !formData.servername,
    };

    setErrors(newErrors);

    if (newErrors.hostname || newErrors.servername) {
      const errorMessages = [];
      if (newErrors.hostname)
        errorMessages.push("The hostname field is required.");
      if (newErrors.servername)
        errorMessages.push("The servername field is required.");

      toast.error(`The given data was invalid.\n${errorMessages.join("\n")}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return false;
    }

    return true;
  };

  const handleAddServer = async () => {
    if (validateForm()) {
      try {
        setLoading(true);
        const serverData = {
          hostname: formData.hostname,
          servername: formData.servername,
          /*settings: {
            pxeProvisioning: formSettings.pxeProvisioning,
            ipmiPowerManagement: formSettings.ipmiPowerManagement,
            ipmiNoVNC: formSettings.ipmiNoVNC,
            alwaysOnDHCP: formSettings.alwaysOnDHCP,
          },*/
        };

        const response = await createServer(serverData);

        toast.success("Server created successfully!", {
          position: "top-right",
          autoClose: 3000,
        });

        if (formSettings.clearInputs) {
          setFormData({
            hostname: "",
            servername: "",
          });
        }

        if (formSettings.redirectAfterCreation) {
          // Add your redirect logic here
          // Example: router.push(`/servers/${response.id}`);
        }

        setOpen(false);
      } catch (error: any) {
        toast.error(error.message || "Failed to create server", {
          position: "top-right",
          autoClose: 5000,
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSettingChange =
    (setting: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormSettings((prev) => ({
        ...prev,
        [setting]: event.target.checked,
      }));
    };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [userResponse, agentsResponse] = await Promise.all([
          getCurrentUsers(),
          getRemoteAgents(),
        ]);

        if (userResponse) {
          setUsers([userResponse]);
        }

        if (agentsResponse?.result && Array.isArray(agentsResponse.result)) {
          setRemoteAgents(agentsResponse.result);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [userResponse, agentsResponse, tagsResponse] = await Promise.all([
          getCurrentUsers(),
          getRemoteAgents(),
          getTags(),
        ]);

        if (userResponse) {
          setUsers([userResponse]);
        }

        if (agentsResponse?.result && Array.isArray(agentsResponse.result)) {
          setRemoteAgents(agentsResponse.result);
        }

        if (tagsResponse?.result?.tags) {
          setTags(tagsResponse.result.tags);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            maxHeight: "90vh",
            overflow: "auto",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h5" mb={3}>
            Add New Server
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box display="grid" gridTemplateColumns="1fr 1fr" gap={4}>
              <Box>
                <Typography variant="subtitle1">Hostname:</Typography>
                <TextField
                  fullWidth
                  value={formData.hostname}
                  onChange={handleInputChange("hostname")}
                  error={errors.hostname}
                  required
                />
              </Box>
              <Box>
                <Typography variant="subtitle1">Servername:</Typography>
                <TextField
                  fullWidth
                  value={formData.servername}
                  onChange={handleInputChange("servername")}
                  error={errors.servername}
                  required
                />
              </Box>

              <Box>
                <Typography variant="subtitle1">Assigned User:</Typography>
                <Select fullWidth defaultValue="">
                  <MenuItem value="">Select User</MenuItem>
                  {users.map((user) => (
                    <MenuItem key={user.id} value={user.id}>
                      {user.name}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
              <Box>
                <Typography variant="subtitle1">Tags (Optional):</Typography>
                <Select fullWidth defaultValue="">
                  {tags.map((tag) => (
                    <MenuItem key={tag} value={tag}>
                      {tag}
                    </MenuItem>
                  ))}
                </Select>
              </Box>

              <Box>
                <Typography variant="subtitle1">Server Type:</Typography>
                <Select fullWidth defaultValue="Auto">
                  <MenuItem value="Auto">Auto</MenuItem>
                  <MenuItem value="Manual">Manual</MenuItem>
                </Select>
              </Box>
            </Box>

            <Box sx={{ width: "100%", mt: 4, mb: 2 }}>
              <Typography variant="h6">
                Quick Configuration (optional)
              </Typography>
            </Box>

            <Box display="grid" gridTemplateColumns="1fr 1fr" gap={4}>
              <Box>
                <Typography variant="subtitle1">Remote Agent:</Typography>
                <Select fullWidth defaultValue="">
                  {remoteAgents.map((agent) => (
                    <MenuItem key={agent.id} value={agent.id}>
                      {agent.name}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
              <Box>
                <Typography variant="subtitle1">IPMI IP / Hostname:</Typography>
                <TextField fullWidth />
              </Box>

              <Box>
                <Typography variant="subtitle1">IPMI User:</Typography>
                <TextField fullWidth />
              </Box>
              <Box>
                <Typography variant="subtitle1">IPMI Password:</Typography>
                <TextField fullWidth />
              </Box>

              <Box>
                <Typography variant="subtitle1">PXE MAC:</Typography>
                <TextField fullWidth />
              </Box>
            </Box>

            <Box mt={2}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formSettings.pxeProvisioning}
                    onChange={handleSettingChange("pxeProvisioning")}
                  />
                }
                label="Enable PXE Provisioning"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={formSettings.ipmiPowerManagement}
                    onChange={handleSettingChange("ipmiPowerManagement")}
                  />
                }
                label="Enable IPMI Power Management"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={formSettings.ipmiNoVNC}
                    onChange={handleSettingChange("ipmiNoVNC")}
                  />
                }
                label="Enable IPMI NoVNC Console"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={formSettings.alwaysOnDHCP}
                    onChange={handleSettingChange("alwaysOnDHCP")}
                  />
                }
                label="Enable Always-On DHCP"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formSettings.redirectAfterCreation}
                    onChange={handleSettingChange("redirectAfterCreation")}
                  />
                }
                label="Redirect to server configuration after creation"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formSettings.clearInputs}
                    onChange={handleSettingChange("clearInputs")}
                  />
                }
                label="Clear input fields after submit"
              />
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box display="flex" justifyContent="space-between">
            <Button variant="contained" color="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddServer}
            >
              Add Server
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default AddServerPopup;
