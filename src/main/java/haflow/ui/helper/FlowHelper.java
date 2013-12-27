package haflow.ui.helper;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import haflow.dto.entity.Edge;
import haflow.dto.entity.Flow;
import haflow.dto.entity.Node;
import haflow.dto.profile.NodeAppearance;
import haflow.dto.profile.NodeConfiguration;
import haflow.service.FlowService;
import haflow.service.NodeAppearanceService;
import haflow.service.NodeConfigurationService;
import haflow.ui.model.ConfigurationItemModel;
import haflow.ui.model.EdgeModel;
import haflow.ui.model.FlowBriefModel;
import haflow.ui.model.FlowListModel;
import haflow.ui.model.FlowModel;
import haflow.ui.model.SaveFlowResultModel;
import haflow.ui.model.NodeModel;
import haflow.ui.model.PositionModel;
import haflow.ui.model.RemoveFlowModel;
import haflow.ui.model.RemoveFlowResultModel;

@Component
public class FlowHelper {

	private FlowService flowService;
	private NodeAppearanceService nodeAppearanceService;
	private NodeConfigurationService nodeConfigurationProfileService;

	private FlowService getFlowService() {
		return flowService;
	}

	@Autowired
	private void setFlowService(FlowService flowService) {
		this.flowService = flowService;
	}

	private NodeAppearanceService getNodeAppearanceService() {
		return nodeAppearanceService;
	}

	@Autowired
	private void setNodeAppearanceService(
			NodeAppearanceService nodeAppearanceService) {
		this.nodeAppearanceService = nodeAppearanceService;
	}

	private NodeConfigurationService getNodeConfigurationProfileService() {
		return nodeConfigurationProfileService;
	}

	@Autowired
	private void setNodeConfigurationProfileService(
			NodeConfigurationService nodeConfigurationProfileService) {
		this.nodeConfigurationProfileService = nodeConfigurationProfileService;
	}

	public FlowListModel getFlowList(int userid,String path) {
		List<Flow> flowList = this.getFlowService().getFlowList(userid,path);
		FlowListModel flowListModel = new FlowListModel();
		flowListModel.setFlows(new ArrayList<FlowBriefModel>());
		for (Flow flow : flowList) {
			FlowBriefModel flowBriefModel = new FlowBriefModel();
			flowBriefModel.setId(flow.getId());
			flowBriefModel.setName(flow.getName());
			flowBriefModel.setNode(flow.getNode());
			flowBriefModel.setPath(flow.getPath());
			flowBriefModel.setParentpath(flow.getParentpath());
			flowListModel.getFlows().add(flowBriefModel);
		}
		return flowListModel;
	}

	public FlowModel getFlow(UUID flowId,int userid) {
		Flow flow = this.getFlowService().getFlow(flowId,userid);
		if (flow == null) {
			return null;
		}
		System.out.println("tiaoshi!!!!!!!!!!!!!!");
		System.out.println(flow.getId());
		FlowModel flowModel = new FlowModel();
		flowModel.setId(flow.getId());
		flowModel.setName(flow.getName());
		flowModel.setNode(flow.getNode());
		flowModel.setPath(flow.getPath());
		flowModel.setParentpath(flow.getParentpath());
		flowModel.setNodes(new HashSet<NodeModel>());
		for (Node node : flow.getNodes()) {
			NodeModel nodeModel = new NodeModel();
			NodeAppearance nodeAppearanceProfile = this
					.getNodeAppearanceService().getNodeAppearance(
							node.getId());
			List<NodeConfiguration> nodeConfigurationProfiles = this
					.getNodeConfigurationProfileService()
					.getNodeConfiguration(node.getId());
			nodeModel.setFlowId(node.getFlow().getId());
			nodeModel.setId(node.getId());
			nodeModel.setModuleId(node.getModuleId());
			nodeModel.setName(node.getName());
			nodeModel.setPosition(new PositionModel());
			nodeModel.getPosition().setLeft(
					nodeAppearanceProfile.getPositionLeft());
			nodeModel.getPosition().setTop(
					nodeAppearanceProfile.getPositionTop());
			nodeModel.setConfigurations(new HashSet<ConfigurationItemModel>());
			for (NodeConfiguration profile : nodeConfigurationProfiles) {
				ConfigurationItemModel model = new ConfigurationItemModel();
				model.setKey(profile.getKey());
				model.setValue(profile.getValue());
				nodeModel.getConfigurations().add(model);
				System.out.println("configuration!!!!!!!");
				System.out.println(profile.getValue());
			}
			flowModel.getNodes().add(nodeModel);
			System.out.println("node!!!!!!!!!");
			System.out.println(node.getId());
			System.out.println(node.getName());
		}
		flowModel.setEdges(new HashSet<EdgeModel>());
		for (Edge edge : flow.getEdges()) {
			EdgeModel edgeModel = new EdgeModel();
			edgeModel.setFlowId(edge.getFlow().getId());
			edgeModel.setId(edge.getId());
			edgeModel.setSourceNodeId(edge.getSourceNode().getId());
			edgeModel.setSourceEndpoint(edge.getSourceEndpoint());
			edgeModel.setTargetNodeId(edge.getTargetNode().getId());
			edgeModel.setTargetEndpoint(edge.getTargetEndpoint());
			flowModel.getEdges().add(edgeModel);
		}
		return flowModel;
	}

	public SaveFlowResultModel saveFlow(UUID flowId, FlowModel model,int userid) {
		boolean success = this.doSaveFlow(flowId, model,userid);
		SaveFlowResultModel result = new SaveFlowResultModel();
		result.setFlowId(flowId);
		result.setSuccess(success);
		if (success) {
			result.setMessage("success");
		} else {
			result.setMessage("fail");
		}
		return result;
	}

	public boolean doSaveFlow(UUID flowId, FlowModel model,int userid) {
		
		Set<Node> nodes = new HashSet<Node>();
		Set<Edge> edges = new HashSet<Edge>();
		for (NodeModel nodeModel : model.getNodes()) {
			if (!nodeModel.getFlowId().equals(flowId)) {
				return false;
			}
			Node node = new Node();
			node.setFlow(null);
			node.setId(nodeModel.getId());
			node.setModuleId(nodeModel.getModuleId());
			System.out.println("return node moduleId");
			System.out.println(nodeModel.getModuleId());
			node.setName(nodeModel.getName());
			this.getNodeAppearanceService().mergeNodeAppearance(
					nodeModel.getId(), nodeModel.getPosition().getLeft(),
					nodeModel.getPosition().getTop());
			if (nodeModel.getConfigurations() != null) {
				for (ConfigurationItemModel configurationItemModel : nodeModel
						.getConfigurations()) {
					this.getNodeConfigurationProfileService()
							.mergeNodeConfiguration(nodeModel.getId(),
									configurationItemModel.getKey(),
									configurationItemModel.getValue());
				}
			}
			nodes.add(node);
		}
		for (EdgeModel edgeModel : model.getEdges()) {
			if (!edgeModel.getFlowId().equals(flowId)) {
				return false;
			}
			Edge edge = new Edge();
			edge.setFlow(null);
			edge.setId(edgeModel.getId());
			edge.setSourceNode(new Node());
			edge.getSourceNode().setId(edgeModel.getSourceNodeId());
			edge.setSourceEndpoint(edgeModel.getSourceEndpoint());
			edge.setTargetNode(new Node());
			edge.getTargetNode().setId(edgeModel.getTargetNodeId());
			edge.setTargetEndpoint(edgeModel.getTargetEndpoint());
			edges.add(edge);
		}
		boolean result = true;
		result = result
				&& this.getFlowService().saveFlow(flowId, model.getName(),model.getNode(),model.getPath(),
						model.getParentpath(),nodes, edges,userid);
		result = result
				&& this.getNodeAppearanceService()
						.cleanUpOrphanNodeAppearance();
		result = result
				&& this.getNodeConfigurationProfileService()
						.cleanUpOrphanNodeConfiguration();
		return result;
	}

	public RemoveFlowResultModel removeFlow(UUID flowId, RemoveFlowModel model,int userid) {
		boolean success = this.getFlowService().removeFlow(flowId,userid);
		success = success
				&& this.getNodeAppearanceService()
						.cleanUpOrphanNodeAppearance();
		success = success
				&& this.getNodeConfigurationProfileService()
						.cleanUpOrphanNodeConfiguration();
		RemoveFlowResultModel result = new RemoveFlowResultModel();
		result.setFlowId(flowId);
		result.setSuccess(success);
		if (success) {
			result.setMessage("success");
		} else {
			result.setMessage("fail");
		}
		return result;
	}

	public FlowListModel renameFlowFolder(UUID flowId, String name,int userid) {
		System.out.println("rename flow helper");
		List<Flow> flowList =this.getFlowService().renameFlowFolder(userid, flowId, name);
		FlowListModel flowListModel = new FlowListModel();
		flowListModel.setFlows(new ArrayList<FlowBriefModel>());
		for (Flow flow : flowList) {
			FlowBriefModel flowBriefModel = new FlowBriefModel();
			flowBriefModel.setId(flow.getId());
			flowBriefModel.setName(flow.getName());
			flowBriefModel.setNode(flow.getNode());
			flowBriefModel.setPath(flow.getPath());
			flowBriefModel.setParentpath(flow.getParentpath());
			flowListModel.getFlows().add(flowBriefModel);
		}
		return flowListModel;
	}
}
