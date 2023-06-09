package com.psk.eshop.service;

import com.psk.eshop.dto.StatisticRequestDTO;
import com.psk.eshop.interceptors.Loggable;
import com.psk.eshop.model.Statistic;
import com.psk.eshop.repository.StatisticRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@AllArgsConstructor
public class StatisticServiceImpl implements StatisticService{
    private final StatisticRepository statisticRepository;
    @Override
    @Loggable
    public Statistic createStatistic(StatisticRequestDTO statisticRequest) {
        var newStatistic = Statistic.builder()
                .orderId(statisticRequest.getOrderId())
                .createdDate(statisticRequest.getCreatedDate())
                .description(statisticRequest.getDescription())
                .build();
        return statisticRepository.save(newStatistic);
    }

    @Override
    @Loggable
    public Statistic updateStatistic(Long statisticId, StatisticRequestDTO statisticRequest) {
        return statisticRepository.findById(statisticId)
                .map(statistic -> {
                    statistic.setOrderId(statisticRequest.getOrderId());
                    statistic.setCreatedDate(statisticRequest.getCreatedDate());
                    statistic.setDescription(statisticRequest.getDescription());
                    return statisticRepository.save(statistic);
                })
                .orElseThrow(
                        () -> new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Statistic with id %d not found", statisticId))
                );
    }
    @Override
    @Loggable
    public void deleteStatisticById(Long statisticId)
    {
        statisticRepository.deleteById(statisticId);
    }

    @Override
    @Loggable
    public Statistic getStatisticById(Long statisticId) {
        return statisticRepository.findById(statisticId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Statistic with id %d not found", statisticId))
        );
    }

    @Override
    @Loggable
    public List<Statistic> getStatistics() {
        return statisticRepository.findAll();
    }
}
